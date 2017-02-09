var config = require('../../config')

module.exports = function(app) {
	app.get('/status', function(req, res) {
		res.json({
			ok: true,
			version: require('../../package').version,
			url: config.url(),
			timestamp: new Date().toISOString()
		})
	})
}