//config/email.js

module.exports.email = {
	service: "Gmail",
	auth: {
		user: "catuhan2517@gmail.com", 
		pass: "tpplinh17"
	},
	templateDir: "api/mailTemplates",
	from: '<Quyen Nguyen>',
	testMode: false,
	ssl: true
}