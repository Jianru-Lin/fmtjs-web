var fs = require('fs')
var path = require('path')

var cache_dir_path = path.resolve(__dirname, 'web/cache')

// exports.root_dir = function() {
// 	return cache_dir_path
// }

exports.add = function(id, index) {
	// make dir
	var dir = path.resolve(cache_dir_path, id)
	try {
		fs.mkdirSync(dir)
	}
	catch (err) {
		// ignore
	}
	// write file
	var file = path.resolve(dir, 'index.json')
	fs.writeFileSync(file, JSON.stringify(index, null, 4))
}
