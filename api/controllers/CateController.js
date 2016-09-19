/**
 * CateController
 *
 * @description :: Server-side logic for managing cates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req,res) {
		res.view('cate/new');
	},

	create: function (req, res, next) {
		if (req.params.all()=='') {
			res.end('Nothing to request');
		}
		Cate.create(req.params.all()).exec(function (err, valid) {
			if (err) {
				console.log(err);
				return next(err);
			}

			return res.redirect('/cate/viewcate');
		});
	},

	viewcate: function (req, res, next) {
		var owner_Id = req.session.userSession.id;
		Cate.find({
			owner: owner_Id
		}).populate('owner').exec(function (err, cate) {

			if (err) return next(err);
			return res.view('cate/catelist', {
				cateLst: cate
			});
		});
	}
};

