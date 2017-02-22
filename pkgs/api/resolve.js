var Module = require('module')
var path = require('path')

module.exports = function(base, target) {
	try {
		if (!target) {
			return require.resolve(base)
		}
		else {
			if (target[0] === '.' || target[0] === '/') {
				var base_filename = Module._resolveFilename(base, module, false)
				var base_dirname = path.dirname(base_filename)
				var target_filename = path.resolve(base_dirname, target)
				target_filename = Module._resolveFilename(target_filename, module, false)
				return target_filename
			}
			else {
				return require.resolve(target)
			}
		}
	}
	catch (err) {
		console.error(err)
		return undefined
	}
}
