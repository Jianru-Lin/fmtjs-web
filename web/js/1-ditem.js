;(function() {
	var ditem = window.ditem = {}
	ditem.get = function(name, cb) {
		load_cache(name, cb)
	}

	// 加载数据
	function load_cache(name, cb) {
		var id = utils.url_params('id')
		if (!id) {
			return
		}

		var url = id + '/' + name + '.json'
		$.getJSON(url, function(data) {
			cb(null, data)
		})
	}
})();