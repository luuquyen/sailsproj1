/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
var crypto = require('crypto');
module.exports = {
	'new': function (req,res) {
		res.view();
	},

	create: function (req, res, next) {

		// Create a User with the params sent from
		// the sign-up form --> new.jade
		User.create(req.params.all(), function userCreate(err, user) {
			
			//If there's an error
			// if (err) return next(err);
			if (err) return next(err);

			if (!user) return next('user is not exist');
			
			if (user) {
				var verify_token = crypto.createHash('md5').update(user.id).digest("hex");
				User.update({id:user.id},{verify:verify_token}).exec(function afterwards(err, updated){

					if (err) {
					// handle error here- e.g. `res.serverError(err);`
						next(err);
						return;
					}
					console.log(updated);
				});

				Mailer.sendWelcomeMail(user);
				res.end('check email');
				console.log('active');
			}
		}); 
	},

	verify: function (req, res, next) {

		User.findOne({
			verify: req.param('code')
			}).exec(function (err, user){
				if (err) {
					return res.end('verified');
				}
	
				User.update({id:user.id},{
											verify: '', 
											active: true
										}).exec(function afterwards(err, updated){

					if (err) {
					// handle error here- e.g. `res.serverError(err);`
						next(err);
						return;
					}
					console.log(updated);
					res.end('actived');
				});
		});
	},

	// render the profile view {/views/show.jade}
	show: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next(err);
			res.view({
				user: user
			});
		});
	},

	index: function (req, res, next) {
		// Get an array of all users in the User conlooection(e.g. table)
		User.find(function foundUsers(err, users) {
			if (err) return next(err);
			// pass the array down to the /views/index.jade page
			res.view({
				users: users
			});  
		}); 
	},
	edit: function (req, res, next) {

		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('user is not exist');
			res.view({
				user: user
			})
		}) 
	},
	update: function (req, res, next) {
		User.update(req.param('id'), req.params.all(), function userUpdate (err) {
			if (err) {
				return res.redirect('/user/edit/'+ req.param('id'));
			}
			res.redirect('/user/show/'+ req.param('id'));
		});
	},
	destroy: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err,user) {
			if (err) return next(err);
			User.destroy(req.param('id'), function userDetroy(err){
				if (err) return next(err);
			});

			res.redirect('/user/');
		});
	}
};

