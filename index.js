var cache = require('./ditem/cache')
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
		// app.listen(23400, '127.0.0.1')
		app.listen(23400)
	},
	stop: function() {
		var http = require('http')
		var index = require('./index')

		var url = index.stop_url()
		// console.log(url)

		http.get(url, function(res) {
			// console.log(res.statusCode)
			// console.log('done.')
		}).on('error', function(err) {
			// ignore
		})
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
	stop_url: function() {
		return this.url() + '/stop'
	}
}