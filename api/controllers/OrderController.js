/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res,next) {

		Order.create(req.params.all(), function(err,order) {

			if(err) {
				return next('Invalid input. Please back and try again');
			}
			if(!order){
				return next('Order not exit');
			}
			if(order){

				Mailer.sendOrderMail(order);
				res.redirect('/order/tempOder');
			}
		});
	},

	index: function (req, res, next) {

		Order.find(function (err, orders) {
			if (err) return next(err);
			res.view({
				orders: orders
			});  
		}); 
	},

	destroy: function (req, res, next) {
		Order.findOne(req.param('id'), function (err,order) {
			if (err) return next(err);
			Order.destroy(req.param('id'), function (err){
				if (err) return next(err);
			});

			res.redirect('/order/');
		});
	},

	tempOder: function (req, res, next) {
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
			res.view('order/tempOrder', {
				results: results
			});
		});
	}
};

