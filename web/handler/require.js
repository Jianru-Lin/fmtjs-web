var share = require('../share/')
var app = require('../index')
var pkgs = require('../../pkgs')
var enc = require('../internal/enc')
var resolve_path = require('path').resolve
var dirname = require('path').dirname
var parse_url = require('url').parse
var format_url = require('url').format

module.exports = function(app) {
	app.get('/require', function(req, res) {
		var parent = req.query.parent
		var target = req.query.target

		// target is npm packge or url?
		if (is_npm_package_name(target) || is_url(target)) {
			// ignore parent
			var package = target
		}
		// parent is url?
		else if (is_url(parent)) {
			if (!target) {
				var package = parent
			}
			else {
				var url = parse_url(parent)
				url.pathname = resolve_path(dirname(url.pathname), target)
				var package = format_url(url)
			}
		}
		// parnt is npm package or path
		else {
			var package = pkgs.resolve(parent, target)
			if (!package) {
				res.end('sorry, target not found :(')
				return
			}
		}

		// redirect
		res.redirect(lv_packge_url(package))
	})
}

function lv_packge_url(package) {
	return 'lv.html?package=' + enc(package)
}

function is_npm_package_name(str) {
	return str && str[0] !== '.' && str[0] !== '/'
}

function is_url(str) {
	return /^https?:\/\//i.test(str)
}