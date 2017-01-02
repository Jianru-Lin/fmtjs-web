var http = require('http')
var index = require('./index')

var url = index.stop_url()
console.log(url)

http.get(url, function(res) {
	console.log(res.statusCode)
	console.log('done.')
})