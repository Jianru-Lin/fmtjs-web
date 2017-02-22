var share = require('../share/')
var app = require('../index')
var pkgs = require('../../pkgs')
var enc = require('../internal/enc')

module.exports = function(app) {
	app.get('/require', function(req, res) {
		var parent = req.query.parent
		var target = req.query.target
		var package = pkgs.resolve(parent, target)
		if (!package) {
			res.end('sorry, target not found :(')
			return
		}
		res.redirect('lv.html?package=' + enc(package))
	})
}