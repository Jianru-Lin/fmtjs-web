var cache = require('./cache')
var express = require('express')
var app = express()

app.get('/stop', function(req, res) {
	process.exit()
})

;(function() {
	var root = require('path').resolve(__dirname, 'web')
	app.use(express.static(root, {fallthrough: true}))

	var cache_root = cache.root()
	app.use(express.static(cache_root))
})();

module.exports = {
	start: function() {
		app.listen(23400)
	},
	stop: function() {
		throw new Error('TODO')
	},
	start_bg: function() {
		var path = require('path')
		var spawn = require('child_process').spawn
		var child = spawn('node', [path.resolve(__dirname, 'start.js')], {detached: true})
		child.stdin.unref()
		child.stdout.unref()
		child.stderr.unref()
		child.unref()
	},
	url: function() {
		return 'http://localhost:23400'
	},
	lv_url: function(id) {
		return 'http://localhost:23400/lv.html?id=' + encodeURIComponent(id)
	},
	stop_url: function() {
		return this.url() + '/stop'
	}
}