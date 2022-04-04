const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		'/apis',
		createProxyMiddleware({
			logLevel: 'debug',
			target: "http://138.197.213.195:8080/",
			changeOrigin: true,
		})
	);
};