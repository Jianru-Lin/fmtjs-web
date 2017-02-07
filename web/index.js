var path = require('path')
var cache = require('../ditem/cache')
var express = require('express')
var app = express()

var web_root_dir = path.resolve(__dirname, 'root')
var cache_root_dir = cache.root()

require('./handler/status')(app)
require('./handler/stop')(app)

app.use(express.static(web_root_dir, {fallthrough: true}))
app.use(express.static(cache_root_dir))

module.exports = app
