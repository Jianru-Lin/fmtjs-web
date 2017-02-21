module.exports = function(name) {
	try {
		return require.resolve(name)
	}
	catch (err) {
		return undefined
	}
}
