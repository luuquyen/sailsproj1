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

	'login': function (req,res) {
		res.view('session/login');
	},

	create: function (req, res, next) {
		//check for email and password in params sent via the form, if none
		//rediret the browser back to the sign-in form.
		if (!{email:req.param('email')}|| !{password:req.param('password')})
		{
			var emailPasswordRequiredError = [{email: 'emailPasswordRequired', message: 'You must enter both a username and password.'}]
			req.session.flash = {
				err: emailPasswordRequiredError
			}
			res.redirect('/session/new');
			return;
		}

		User.findOne({email:req.param('email')}).exec(function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('user is not exist');

			bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
				if (err) return next(err);
				if (!valid) return next('Invalid');

				if (user.active == true) {

					req.session.authenticated = true;
					req.session.User = user;
					
					res.redirect('/user/admin/' + user.id);
				}
				else {
						res.view('user/notconfir');
					}	
			});
		});
	},

	destroy: function (req, res, next) {
		req.session.destroy();
		res.redirect('/session/new');
	}
};

