var LS = (function() {
	var config = {
		ctx : "/myspace/blog/",
	    logo : {
			'title' : 'LikeStar',
			'url' : 'index.html'
		},
	    description : '申锦祥的博客',
	    menu : [
			{
				'title' : '首页',
				'url' : 'index.html'
			},
			{
				'title' : '归档',
				'url' : 'index.html'
			},
			{
				'title' : '评论',
				'url' : 'index.html'
			}
		],
		sideBar : ['category', 'tags', 'posts'],
		postList : [
			{
				'id' : 2,
				'title' : 'Canvas实现图片缩放、移动、旋转效果',
				'date' : '2015/04/07',
				'tags' : ['canvas', 'javascript'],
				'category' : 'canvas',
				'desc' : '利用canvas实现图片缩放、移动、旋转效果。',
				'url' : 'pages/canvas/20150407/Canvas实现图片缩放、移动、旋转效果.html'
			},
			{
				'id' : 1,
				'title' : 'Hello world',
				'date' : '2015/04/05',
				'tags' : ['java', 'javascript'],
				'category' : 'demo',
				'desc' : "第一个文章，利用prism实现页面中代码块语法高亮",
				'url' : "pages/demo/20150405/hello world.html"
			}
		]
	};

	/**
	 * 设置header部分显示内容
	 */
	function readerHeader(num) {
		var currMenu = num || 0;
		// logo
		$("#logo").text(config.logo.title);
		$("#logo").attr("href", config.ctx + config.logo.url);

		// 副标题
		$("#description").text(config.description);

		// 菜单
		$("#nav-menu").empty();
		for(var i = 0; i < config.menu.length; i++) {
			var $a = $("<a>" + config.menu[i].title+ "</a>");
			$a.attr("href", config.ctx + config.menu[i].url);
			if(currMenu == i) {
				$a.addClass("current");
			}
			$("#nav-menu").append($a);
		}
	}

	/**
	 * 渲染侧边分类
	 */
	function rendercategoryBar() {
		var cate = [];
		var _cObj = {};
		for(var i = 0; i < config.postList.length; i++) {
			_cObj[config.postList[i].category] = 1;
		}
		for(var c in _cObj) {
			if(_cObj.hasOwnProperty(c)) {
				cate.push(c);
			}
		}

		var $widget = $("<div class='widget'><div class='widget-title'>分类</div></div>");
		var $cateul = $("<ul class='category-list' id='categoryList'></ul>");
		for(var j = 0; j < cate.length; j++) {
			var _li = "<li class='category-list-item'><a class='category-list-link' href='javascript:void(0);'>" + cate[j] + "</a></li>";
			$cateul.append($(_li));
		}
		$widget.append($cateul);
		$("#sidebar").append($widget);
	}

	/**
	 * 渲染侧边标签
	 */
	function rendertagsBar() {
		var tags = [];
		var _tagObj = {};
		for(var i = 0; i < config.postList.length; i++) {
			for(var j = 0; j < config.postList[i].tags.length; j++) {
				_tagObj[config.postList[i].tags[j]] = 1;
			}
		}
		for(var t in _tagObj) {
			if(_tagObj.hasOwnProperty(t)) {
				tags.push(t);
			}
		}

		var $widget = $("<div class='widget'><div class='widget-title'>标签</div></div>");
		var $tagsDiv = $("<div class='tagcloud' id='tagsList'></div>");
		for(var k  = 0; k < tags.length; k++) {
			var _tag = "<a href=\"javascript:void(0);\">" + tags[k] + "</a>";
			$tagsDiv.append($(_tag));
		}
		$widget.append($tagsDiv);
		$("#sidebar").append($widget);
	}

	/**
	 * 渲染侧边 最近文章
	 */
	function renderpostBar() {
		var $widget = $("<div class='widget'><div class='widget-title'>最近文章</div></div>");
		var $postul = $("<ul class='post-list'></ul>");
		for(var i = 0; i < config.postList.length; i++) {
			if(i >= 6) {break}
			var $li = $("<li class='post-list-item'><a class='post-list-link' href=\"javascript:void(0);\">" + config.postList[i].title + "</a></li>");
			$postul.append($li);
		}
		$widget.append($postul);
		$("#sidebar").append($widget);
	}

	function renderContent(option) {
	}

	return {
		init : function(option) {
			// 顶部
			readerHeader(option.currentMenu - 1);

			// 侧边栏
			var sidebar = option.sidebar; 
			for( var i = 0; i < sidebar.length; i++) {
				var funName = "render" + sidebar[i] + "Bar";
				eval(funName + '()');
			}
		}

	};
})();
