
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		'/apis',
		createProxyMiddleware({
			logLevel: 'debug',
			target: "http://localhost:8080/",
			changeOrigin: true,
		})
	);
};