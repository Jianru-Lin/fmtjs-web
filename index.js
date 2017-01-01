var express = require('express')
var app = express()

;(function() {
	var root = require('path').resolve(__dirname, 'web')
	app.use(express.static(root))
})();

module.exports = {
	start: function() {
		app.listen(23400)
	},
	stop: function() {
		throw new Error('TODO')
	},
	lv_url: function(id) {
		return 'http://localhost:23400/lv.html?id=' + encodeURIComponent(id)
	}
}

module.exports.start()
