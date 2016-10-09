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
	}
};

