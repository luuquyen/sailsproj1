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
	'checkmail': function (req,res) {
		res.view('user/checkmail');
	},

	create: function(req,res,next) {

		User.create(req.params.all(), function(err,user) {
			if(err) {
				return next('Invalid input. Please back and try again');
			}
			if(!user){
				return next('User not exit');
			}
			if(user){
				// Upload avatar
				req.file('avatar').upload({
					dirname: '../../assets/images/avatar',
					maxByte: 10000000,
					saveAs: function(file, cb) {
						var d = new Date();
						var allowExts = ['png', 'gif', 'jpeg', 'jpg'];
						var fExt = file.filename.split('.');

						if (allowExts.indexOf(fExt[1]) === -1) {
							return res.badRequest('File not supported.');
						} else {
							cb(null, file.filename);
						}

					}
				}, function upfile(err, avatarImg) {
					if (err) return res.send(404, 'File error');

					if (avatarImg.length == 0) {
						return res.view('layoutadmin', {
							user: user
						});
					} else {
						var filePath = avatarImg[0].filename;
						var verify_token = crypto.createHash('md5').update(user.id.toString()).digest('hex');
						User.update({
							id: user.id
							}, {
							avatar: filePath,
							verify:verify_token
							}).exec(function(err, updated) {
							if (err) {
								next(err);
								return;
							} 
						});
					}
				});

				Mailer.sendWelcomeMail(user);
				res.redirect('/user/checkmail');
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
										}).exec(function afterwards(err, update){

					if (err) {
					// handle error here- e.g. `res.serverError(err);`
						next(err);
						return;
					}
					return res.view('session/login', {user: user});
				});
		});
	},

	admin: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user) {
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

	// render the profile view {/views/show.jade}
	show: function (req, res, next) {

		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('user is not exist');
			res.view({
				user: user
			})
		}) 
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

