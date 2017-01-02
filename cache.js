var fs = require('fs')
var path = require('path')
var os = require('os')

var cache_dir_path = path.resolve(os.tmpdir(), 'lambda-view-cache')
mkdir(cache_dir_path)

exports.root = function() {
	return cache_dir_path
}

exports.add = function(id, index) {
	// make dir
	var dir = path.resolve(cache_dir_path, id)
	mkdir(dir)
	// write file
	var file = path.resolve(dir, 'index.json')
	fs.writeFileSync(file, JSON.stringify(index))
}

function mkdir(path) {
	try {
		fs.mkdirSync(path)
	}
	catch (err) {
		// ignore
	}
}