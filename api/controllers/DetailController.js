/**
 * DetailController
 *
 * @description :: Server-side logic for managing details
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
module.exports = {
	
	new: function (req, res) {
		Cate.find(function (err, cates) {
			if (err) return next(err);
		
			res.view({
				cates: cates
			});
		});
	},

	index: function (req, res, next) {

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
			res.view({
				data: results
			});
		});
	},

	create: function (req, res, next) {
		if (!req.params.all()) {
			res.end('Nothing to request');
		}
		console.log(req.params.all());

		Detail.create(req.params.all()).exec(function (err, detail) {
			if (err) {
				console.log(err);
				return next(err);
			}
			req.file('image').upload({
				dirname: '../../assets/images/products',
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
			}, function upfile(err, prdImg) {
				if (err) return res.send(404, 'File error');

				if (prdImg.length == 0) {
					return res.view('detail/list', {
						detail: detail
					});
				} else {
					var filePath = prdImg[0].filename;
					Detail.update({
						id: detail.id
						}, {
						image: filePath,
						}).exec(function(err, updated) {
						if (err) {
							next(err);
							return;
						} 
					});
				}
			});
			
			res.redirect('/detail');
		});
	},

	edit: function (req, res, next) {

		if (req.param('id') =='') {
			return next('Nothing to request');
		}
		Detail.findOne(req.param('id'), function (err, detail) {
			if (err) return next(err);
			if (!detail) return next('detail is not exist');
			res.view({
				detail: detail
			})
		}) 
	},

	update: function (req, res, next) {
		Detail.update(req.param('id'), req.params.all(), function (err) {
			if (err) {
				return res.redirect('/detail/edit/'+ req.param('id'));
			}
			res.redirect('/detail/');
		});
	},

	list: function (req, res, next) {
		console.log(req.param('owner'));
		Detail.find({
			owner: req.param('owner')
		}).populate('owner').exec(function(err, details){
			if (err) return next(err);
		
			res.view({
				details: details
			});
		});
	},

	listtemp: function (req, res, next) {
		console.log(req.param('owner'));

		Detail.find({owner: req.param('owner')}
			).exec(function(err, details){
			if (err) return next(err);
		
			return res.redirect('/detail/list');
		});
	},
	update: function(req, res) {
		var updateData = req.allParams();

		Detail.update({
			id: updateData.id
		}, updateData).exec(function(err, updated) {
			if (err) return res.send(err, 500);
			console.log(updated);
			// Update prd
			req.file('prdUpdate').upload({
				dirname: '../../assets/images/products',
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
			}, function upfile(err, prdImg) {
				if (err) return res.send(err, 500)

				if (prdImg.length == 0) {
					return res.redirect('/detail/');
					console.log('Not image product');
				} else {
					console.log(prdImg);
					var filePath = prdImg[0].filename;

					Detail.update({
						id: updateData.id
					}, {
						image: filePath
						}).exec(function(err, prdUpdate) {
						if (err) {
							console.log(err);
							return res.send(err, 500);
						}

						return res.redirect('/detail/');
					});
				}
			});
		});
	},

	destroy: function (req, res, next) {
		Detail.findOne(req.param('id'), function (err) {
			if (err) return next(err);
			Detail.destroy(req.param('id'), function (err){
				if (err) return next(err);
			});

			res.redirect('/detail/');
		});
	}
};

