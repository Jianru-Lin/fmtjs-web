// 用于支持多语言（中文／英文）
var translator = (function() {
	var lang_table = {
		'en-us': {
			'fold-all': 'Fold All',
			'unfold-all': 'Unfold All'
		},
		'zh-cn': {
			'fold-all': '折叠全部',
			'unfold-all': '展开全部'
		}
	}

	return {
		run: function() {
			var lang = navigator.language || navigator.browserLanguage || 'en-us'
			return this.convert_to(lang)
		},
		convert_to: function(lang) {
			lang = lang.toLowerCase()
			if (!lang_table[lang]) return false
			$('[x-t]').each(function(i, item) {
				$item = $(item)
				var v = $item.attr('x-t')
				if (lang_table[lang][v]) {
					$item.text(lang_table[lang][v])
				}
			})
			return true
		}
	}
})();

// 一些工具函数
var util = (function() {
	var obj = {}

	obj.mouse_enter_leave = function(selector, enter_cb, leave_cb) {
		if (Array.isArray(selector)) {
			selector.forEach(function(s) {
				obj.mouse_enter_leave(s, enter_cb, leave_cb)
			})
			return
		}

		enter_cb = enter_cb || function() {}
		leave_cb = leave_cb || function() {}

		$(selector).on('mouseenter', function() {
			enter_cb.apply(this, arguments)
		})
		$(selector).on('mouseleave', function() {
			leave_cb.apply(this, arguments)
		})
	}

	return obj
})();

// 允许用户对某些结构进行水平／垂直布局切换
function can_switch_horizontal_vertical_layout() {
	
	// SequenceExpression

	$('#content').on('click', '.SequenceExpression > .expressions > .operator', function() {
		$this = $(this)
		$SequenceExpression = $this.parent().parent()
		$SequenceExpression.toggleClass('vertical-layout')
		$SequenceExpression.toggleClass('area')
	})
	
	// VariableDeclaration

	$('#content').on('click', '.VariableDeclaration > .declarations > .comma', function() {
		$this = $(this)
		$VariableDeclaration = $this.parent().parent()
		$VariableDeclaration.toggleClass('vertical-layout')
		// 如果是处于 ForStatement 的 init 部分，则还需要加上 area 高亮切换
		if (in_for_statement_init()) {
			$declarations = $this.parent()
			$declarations.toggleClass('area')			
		}

		function in_for_statement_init() {
			var $parent1 = $VariableDeclaration.parent()
			var $parent2 = $parent1.parent()
			var $parent3 = $parent2.parent()
			return (
				$parent1.hasClass('init')
				&& $parent2.hasClass('collapsable')
				&& $parent3.hasClass('ForStatement')
			)
		}
	})

	$('#content .VariableDeclaration').addClass('vertical-layout')
	$('#content .ForStatement > .collapsable > .init > .VariableDeclaration.muti-declarations > .declarations').addClass('area')

	// ObjectExpression

	$('#content').on('click', '.ObjectExpression > .properties > .collapsable.bracket > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	$('#content .ObjectExpression > .properties > .collapsable.bracket').addClass('vertical-layout')

	// ArrayExpression

	$('#content').on('click', '.ArrayExpression > .elements > .collapsable.square-bracket > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	// ArrayPattern

	$('#content').on('click', '.ArrayPattern > .elements > .collapsable.square-bracket > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	// FunctionExpression

	$('#content').on('click', '.FunctionExpression > .params > .collapsable > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	// FunctionDeclaration

	$('#content').on('click', '.FunctionDeclaration > .params > .collapsable > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	// ArrowFunctionExpression

	$('#content').on('click', '.ArrowFunctionExpression > .params > .collapsable > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	// CallExpression

	$('#content').on('click', '.CallExpression > .arguments > .collapsable > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})

	// NewExpression

	$('#content').on('click', '.NewExpression > .arguments > .collapsable > .comma', function() {
		$this = $(this)
		$collapsable = $this.parent()
		$collapsable.toggleClass('vertical-layout')
		$collapsable.toggleClass('area')
	})
}

// 允许用户折叠／展开代码块
function can_collapse_expand() {
	// 可折叠特性实现
	$('#content').on('mouseenter', '.left-coll', function() {
		$this = $(this)
		$this.addClass('hover')
		$this.nextAll('.collapsable').addClass('hover')
		$this.nextAll('.right-coll').addClass('hover')
	})

	$('#content').on('mouseenter', '.right-coll', function() {
		$this = $(this)
		$this.addClass('hover')
		$this.prevAll('.collapsable').addClass('hover')
		$this.prevAll('.left-coll').addClass('hover')
	})

	$('#content').on('mouseleave', '.left-coll', function() {
		$this = $(this)
		$this.removeClass('hover')
		$this.nextAll('.collapsable').removeClass('hover')
		$this.nextAll('.right-coll').removeClass('hover')
	})

	$('#content').on('mouseleave', '.right-coll', function() {
		$this = $(this)
		$this.removeClass('hover')
		$this.prevAll('.collapsable').removeClass('hover')
		$this.prevAll('.left-coll').removeClass('hover')
	})

	$('#content').on('click', '.left-coll', function() {
		$this = $(this)
		toggle($this.nextAll('.collapsable'))
	})

	$('#content').on('click', '.right-coll', function() {
		$this = $(this)
		toggle($this.prevAll('.collapsable'))
	})

	$('#content').on('click', '.collapsable-switcher', function() {
		$this = $(this)
		expand($this.prevAll('.collapsable'))
	})

	function toggle($collapsable) {
		if ($collapsable.hasClass('hidden')) {
			expand($collapsable)
		}
		else {
			collapse($collapsable)
		}
	}

	function collapse($collapsable) {
		$collapsable.addClass('hidden')
		$collapsable.nextAll('.collapsable-switcher').removeClass('hidden')
	}

	function expand($collapsable) {
		$collapsable.removeClass('hidden')
		$collapsable.nextAll('.collapsable-switcher').addClass('hidden')
	}
}

// 允许用户在运算符上悬停查看操作数
function can_highlight_operator() {
	util.mouse_enter_leave(
		[
			'.BinaryExpression > .operator',
			'.LogicalExpression > .operator',
			'.UnaryExpression > .operator',
			'.UpdateExpression > .operator'
		],
		function() {
			$(this).parent().addClass('highlight-operator')
		},
		function() {
			$(this).parent().removeClass('highlight-operator')
		}
	)

	util.mouse_enter_leave(
		[
			'.SequenceExpression > .expressions > .operator'
		],
		function() {
			$(this).parent().parent().addClass('highlight-operator')
		},
		function() {
			$(this).parent().parent().removeClass('highlight-operator')
		}
	)

	util.mouse_enter_leave(
		[
			'.MemberExpression > .dot'
		],
		function() {
			$(this).parent().addClass('highlight-operator')
		},
		function() {
			$(this).parent().removeClass('highlight-operator')
		}
	)
}

// 允许用户使用工具栏功能
function can_use_toolbar() {
	// 工具栏按钮功能
	$('button#col-all').click(function() {
		$('.collapsable.bracket').addClass('hidden')
		$('.collapsable-switcher.bracket').removeClass('hidden')
	})
	
	$('button#exp-all').click(function() {
		$('.collapsable-switcher.bracket').addClass('hidden')
		$('.collapsable.bracket').removeClass('hidden')
	})
}

// 隐藏部分表达式括号，不要让程序看起来太复杂
function hide_unnecessary_exp_brace() {
	$('.exp-brace > .collapsable > .Identifier').parent().parent().addClass('unnecessary')
	$('.exp-brace > .collapsable > .Literal').parent().parent().addClass('unnecessary')
	$('.exp-brace > .collapsable > .TaggedTemplateExpression').parent().parent().addClass('unnecessary')
	$('.exp-brace > .collapsable > .TemplateLiteral').parent().parent().addClass('unnecessary')
	$('.exp-brace > .collapsable > .ThisExpression').parent().parent().addClass('unnecessary')
	// $('.exp-brace > .collapsable > .MemberExpression').parent().parent().addClass('unnecessary')
}

// 点击高亮相同的标识符
function can_highlight_same_identifier() {
	// 扫描所有的 .Identifier 收集其 data-id 属性，建立映射
	var map_table = {}
	$('.Identifier').each(function(i, element) {
		var $element = $(element)
		var name = 'id:' + $element.text()

		if (!map_table[name]) {
			map_table[name] = $element
		}
		else {
			map_table[name] = map_table[name].add($element)
		}
	})

	$('.Identifier').click(function() {
		// 当前标识符已经是高亮的？则关闭高亮即可
		if ($(this).hasClass('highlight')) {
			$('.Identifier.highlight').removeClass('highlight')
		}
		// 否则关闭已经高亮的，再高亮新的
		else {
			// 首先取消掉已经高亮的
			$('.Identifier.highlight').removeClass('highlight')
			// 然后才是高亮相同的
			var name = 'id:' + $(this).text()
			if (map_table[name]) {
				map_table[name].addClass('highlight')
			}
		}
	})
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

window.ui = {}

$(function() {
	var control = new Vue({
		el: '#control',
		data: {
			version: ''
		}
	})

	translator.run()

	ui.version = function(v) {
		control.version = v
	}
})

$(function() {
	var title = new Vue({
		el: '#title',
		data: {
			filename: ''
		}
	})

	ui.filename = function(v) {
		title.filename = v
	}
})

// $(function() {
window.onload = function() {

	// load...

	var id = utils.url_params('id')
	if (!id) {
		return
	}

	load_cache('index', function(err, index) {
		if (err) return
		init(index)
	})
}
// })

function init(index) {
	ui.version(index.version)
	ui.filename(index.filename)

	var ast = index.att.ast
	var ctx = index.att.ctx
	// console.log(ctx)
	try {
		// $('#ast').text(JSON.stringify(ast, null, 4))
		var vdom_item = process_ast(ast, ctx)
		// $('#vdom').text(JSON.stringify(vdom_item, null, 4))
		var dom = vdom_item.toDom()
		$('#content').append(dom)
		setTimeout(function() {
			$('#col-all')[0].click()
		}, 0)
	}
	catch (err) {
		log('error', err.toString())
		debugger
		throw err
	}

	can_switch_horizontal_vertical_layout()
	can_collapse_expand()
	can_highlight_operator()
	hide_unnecessary_exp_brace()
	can_use_toolbar()
	can_highlight_same_identifier()
}