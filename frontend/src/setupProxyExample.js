const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/apis', {
		logLevel: 'debug',
		target: "https://YOUR-IP-ADDRESS/:8080/",
		changeOrigin: true,
		secure: true,

	}));
};