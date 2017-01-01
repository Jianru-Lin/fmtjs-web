var fs = require('fs')
var path = require('path')

var cache_dir_path = path.resolve(__dirname, 'web/cache')
mkdir(cache_dir_path)

exports.add = function(id, index) {
	// make dir
	var dir = path.resolve(cache_dir_path, id)
	mkdir(dir)
	// write file
	var file = path.resolve(dir, 'index.json')
	fs.writeFileSync(file, JSON.stringify(index, null, 4))
}

function mkdir(path) {
	try {
		fs.mkdirSync(path)
	}
	catch (err) {
		// ignore
	}
}