// api/services/Mailer.js
var crypto = require('crypto');
module.exports = {

	sendWelcomeMail: function(obj) {

		var verify_token = crypto.createHash('md5').update(obj.id.toString()).digest("hex");
		sails.hooks.email.send(
			"welcomeEmail", 

			{
				verify_token: crypto.createHash('md5').update(obj.id.toString()).digest("hex"),
				link: "http://localhost:1337/user/verify?code=" + verify_token,
				Name: obj.name
			},

			{
				to: obj.email,
				subject: "Welcome Email",
			},

			function (err) {
				console.log(err || "sent mail");
			}
		)
	},

	sendOrderMail: function(obj) {

		sails.hooks.email.send(
			"orderEmail", 

			{
				Name: obj.nameOrder,
				Deal: obj.nameprd,
				Price: obj.price,
				Phone: obj.phoneOrder,
				House: obj.houseOrder,
				Street: obj.streetOrder,
				Ward: obj.wardOrder,
				District: obj.districtOrder,
				City: obj.cityOrder

			},

			{
				to: obj.emailOrder,
				subject: "Order Email",
			},

			function (err) {
				console.log("loi gui mail",err || "sent mail");
				console.log(obj.emailOrder);
			}
		)
	}
};
