// api/services/Mailer.js
var crypto = require('crypto');
module.exports.sendWelcomeMail = function(obj) {

	var verify_token = crypto.createHash('md5').update(obj.id).digest("hex");
	sails.hooks.email.send(
		"welcomeEmail", 

		{
			verify_token: crypto.createHash('md5').update(obj.id).digest("hex"),
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
}
