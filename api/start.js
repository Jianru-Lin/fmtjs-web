var dbg = require('debug')('fmtjs-web:start')
var assert = require('assert')
var app = require('../web')
var config = require('../config')

// # cb(err, status)
module.exports = function(opt, cb) {
	var self = this

	opt = opt || {}
	var host = opt.host || config.host
	var port = opt.port || config.port
	dbg('host=' + host + ', port=' + port)

	var onetime_cb = (function() {
		var invoked = false
		return function() {
			if (invoked) return
			if (cb) cb.apply(this, arguments)
		}
	})();

	app.listen(port, host, function() {
		self.status(function(err, status) {
			assert(!err)
			onetime_cb(undefined, status)
		})
	}).once('error', function(err) {
		onetime_cb(err)
	})
}