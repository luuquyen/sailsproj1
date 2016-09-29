/**
 * CateController
 *
 * @description :: Server-side logic for managing cates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	new: function (req,res) {
		Cate.find(function foundCates(err, cates) {
			if (err) return next(err);
			// pass the array down to the /views/index.jade page
			res.view({
				cates: cates
			});
		}); 
	},

	create: function (req, res, next) {
		if (!req.params.all()) {
			res.end('Nothing to request');
		}
		Cate.create(req.params.all()).exec(function (err, valid) {
			if (err) {
				console.log(err);
				return next(err);
			}

			return res.redirect('/cate');
		});
	},

	index: function (req, res, next) {

		Cate.find(function foundCates(err, cates) {
			if (err) return next(err);
			// pass the array down to the /views/index.jade page
			res.view({
				cates: cates
			});
		}); 
	},

	viewcate: function (req, res, next) {

		Cate.find(function foundCates(err, cates) {
			if (err) return next(err);
			
			res.view(
				'cate/catelist', {
				cates: cates
			});
		}); 
	},
	edit: function (req, res, next) {

		if (req.param('id') =='') {
			return next('Nothing to request');
		}
		Cate.findOne(req.param('id'), function foundcate(err, cate) {
			if (err) return next(err);
			if (!cate) return next('cate is not exist');
			res.view({
				cate: cate
			})
		}) 
	},
	update: function (req, res, next) {
		if (!req.param('id')) {
			return next('Nothing to request');
		}
		Cate.update(req.param('id'), req.params.all(), function cateUpdate (err) {
			if (err) {
				return res.redirect('/cate/edit/'+ req.param('id'));
			}
			res.redirect('/cate/');
		});
	},
	destroy: function (req, res, next) {
		if (!req.param('id')) {
			next('Nothing to request');
			return res.json(403,{err: 0, message:'Notthing to request'});
		}else {
			Cate.destroy({id:req.param('id')}).exec(function (err) {
				if (err) {
					next(err);
					console.log('Come here');
					return res.json(403,{err: 0,message:'Can not destroy'});
				}
				console.log('Come here after');
				return res.json(200,{data: 1});
			});			
		}	
	}
};

