/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
var detailArr = {};
module.exports = {
	
	findDB: function (req, res, next) {
		async.parallel([
			function(callback) {
				Cate.find({}).populate('details').exec(function(err, cates){
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
				results: results
			});
		});
	},

	category: function (req, res, next) {

		async.parallel([
			function(callback) {
				Cate.find({}).populate('details').exec(function(err, cates){
					callback(null, cates);
				});
			},
			function(callback) {
				Detail.find({owner:req.param('id')}).populate('owner').exec(function(err, details){
					callback(null, details);
				});
			},
			function(callback) {
				Cate.findOne({id:req.param('id')}).populate('details').exec(function(err, cate){
					callback(null, cate);
				});
			}
		],//option callback
		function(err, results){
			res.view('category', {
				results: results
			});
		});
	},

	deal: function (req, res, next) {
		async.parallel([
			function(callback) {
				Cate.find({}).populate('details').exec(function(err, cates){
					callback(null, cates);
				});
			},
			function(callback) {
				Detail.find({owner:req.param('id')}).populate('owner').exec(function(err, details){
					callback(null, details);
				});
			},
			function(callback) {
				Cate.findOne({id:req.param('id')}).populate('details').exec(function(err, cate){
					callback(null, cate);
				});
			},
			function(callback) {
				Detail.findOne({id:req.param('id')}).populate('owner').exec(function(err, detail){
					callback(null, detail);
				});
			}
		],//option callback
		function(err, results){
			res.view('deal', {
				results: results
			});
		});
	}

};

