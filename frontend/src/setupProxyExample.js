
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			logLevel: 'debug',
			target: "http://YOUR-IP-ADDRESS/:8080/",
			changeOrigin: true,
		})
	);
};

