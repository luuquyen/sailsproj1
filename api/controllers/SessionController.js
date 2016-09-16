/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {

	'new': function (req,res) {
		res.view('session/new');
	},

	create: function (req, res, next) {
		// Check for email and password in params sent via the form, if none
		// redirect the brower back to the sign-in form
		if (!req.param('email') || !req.param('password')) {
			//return next({err : Password doesnot match password comfirmation})
			//var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both email and password.'}]
			return next(err);
		}

		User.findOne({email:req.param('email')}).exec(function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('user is not exist');

			bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
				if (err) return next(err);
				if (!valid) return next('Invalid');
				if (valid && user.active == true) {

					req.session.authenticated = true;
					req.session.User = user;

					res.redirect('/user/show/'+user.id);
				}
				else {
						res.end('Your acount is not confir');
					}	
			});
		});
	}
};

