/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
module.exports = {

	findDB: function (req, res, next) {
		var locals = {};
		async.parallel([
			//Load cates
			function(callback) {
				Cate.find(function (err, cates) {
					if (err) return next(err);
					// pass the array down to the /views/index.jade page
					locals.cates = cates;
					callback();
				}); 
			},

			//Load details
			function(callback) {
				Detail.find(function (err, details) {
					if (err) return next(err);
					// pass the array down to the /views/index.jade page
					locals.details = details;
					callback();
				});
			}
		], function(err) { //This function gets called after the two tasks have called their "task callbacks"
			if (err) return next(err); //If an error occurred, we let express handle it by calling the `next` function
			//Here `locals` will be an object with `cates` and `details` keys
			//Example: `locals = {cates: [...], details: [...]}`
			console.log(locals);
			res.view('index', {
				locals: locals
			});
		});
			
	}

};

