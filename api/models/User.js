/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
// var bcrypt = require('bcrypt');

module.exports = {
	schema: true,
	
	attributes: {
		name: {
			type: 'string',
			required: true
		},

		job: {
			type: 'string'
		},

		email: {
			type: 'string',
			email: true,
			required: true,
			unique: true
		},

		admin: {
			type: 'boolean',
			defaultsTo: false
		},

		password: {
			type:'string'
		},

		confirmation: {
			type: 'string'
		},

		verify: {
			type: 'string'
		},

		active: {
			type: 'boolean',
			defaultsTo: false
		},
		avatar: {
			type: 'string',
			defaultsTo: ''
		},

		encryptedPassword: {
			type: 'string'
		},

		cate: {
			collection: 'cate',
			via: 'owner'
		},
		
		toJSON: function () {
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirmation;
			delete obj._csrf;
			return obj;
		}
	},

	beforeCreate: function(values, next) {
		if (!values.password || values.password != values.confirmation) {
			return next({err: ["Password doesnot match password confirmation."]});
		}

		require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.encryptedPassword = encryptedPassword;
			next();
		});
	}
};

