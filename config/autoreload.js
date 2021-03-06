// [your-sails-app]/config/autoreload.js
module.exports.autoreload = {
	active: true,
	usePolling: false,
	dirs: [
		"api/models",
		"api/controllers",
		"api/services",
		"api/policies",
		"config/locales",
	],
	ignored: [
		"**.ts",
		".tmp**",
		".tmp/**",
		"views/**",
		"upload"
	]
};