/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
module.exports = {

	findDB: function (req, res, next) {
		
		async.parallel([
			function(callback) {
				Cate.find(function (err, cates) {
					callback(null, cates);
				});
			},
			function(callback) {
				Detail.find(function (err, details) {
					callback(null, details);
				});
			}
		],//option callback

		function(err, results){
			res.view('index', {
				data: results
			});
		});	
	}

};

