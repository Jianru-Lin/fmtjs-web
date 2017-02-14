module.exports = function(app) {
	app.post('/compile', function(req, res) {
		// todo

		res.json({
			ok: true
		})
	})
}