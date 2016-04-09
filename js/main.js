var LS = (function() {
	var config = {
		ctx : "/myspace/blog/",
	    logo : {
			'title' : 'LikeStar',
			'url' : 'index.html'
		},
		music : {
			'src' : 'music/网易游戏 - 江南野外.mp3',
		},
	    description : '申锦祥的博客',
	    menu : [
			{
				'title' : '首页',
				'url' : 'index.html'
			},
			{
				'title' : '归档',
				'url' : 'archive.html'
			}
		],
		sideBar : ['category', 'tags', 'posts'],
		postList : [
			{
				'id' : 4,
				'title' : '旋转效果',
				'date' : '2016/04/19',
				'tags' : ['java', 'javascript'],
				'category' : 'java',
				'desc' : '利用canvas实现图片缩放、移动、旋转效果。',
				'url' : 'pages/canvas/20150407/Canvas实现图片缩放、移动、旋转效果.html'
			},
			{
				'id' : 3,
				'title' : 'Canvas旋转效果',
				'date' : '2016/04/09',
				'tags' : ['canvas', 'javascript'],
				'category' : 'canvas',
				'desc' : '利用canvas实现图片缩放、移动、旋转效果。',
				'url' : 'pages/canvas/20150407/Canvas实现图片缩放、移动、旋转效果.html'
			},
			{
				'id' : 2,
				'title' : 'Canvas实现图片缩放、移动、旋转效果',
				'date' : '2015/04/09',
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

		$(document).on("click", ".category-list-item", function() {
			renderArchiveContent({
				'type' : 'category',
				'value' : $(this).find("a").text()
			});
		});
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

		$(document).on("click", "#tagsList a", function() {
			renderArchiveContent({
				'type' : 'tags',
				'value' : $(this).text()
			});
		});
	}

	/**
	 * 渲染侧边 最近文章
	 */
	function renderpostBar() {
		var $widget = $("<div class='widget'><div class='widget-title'>最近文章</div></div>");
		var $postul = $("<ul class='post-list'></ul>");
		for(var i = 0; i < config.postList.length; i++) {
			if(i >= 6) {break}
			var $li = $("<li class='post-list-item'><a class='post-list-link' href='" + config.ctx + config.postList[i].url + "'>" + config.postList[i].title + "</a></li>");
			$postul.append($li);
		}
		$widget.append($postul);
		$("#sidebar").append($widget);
	}

	/**
	 * 渲染 文章列表 
	 */
	function renderPostContent(pageNum) {
		$("#nav-menu a").removeClass("current").eq(0).addClass("current");
		$("#main_content").empty();
		var pageSize = 10;
		var posts = [];
		for(var i = 0; i < config.postList.length; i++) {
			if(i < (pageNum - 1) * pageSize) {
				continue;
			}
			if(i >= pageNum * pageSize) {
				break;
			}
			var $post = $("<div class='post'></div>");
			$post.append($("<h2 class='post-title'><a href='"+config.ctx+config.postList[i].url + "'>" + config.postList[i].title + "</a></h2>"));
			$post.append($("<div class='post-meta'>" + config.postList[i].date + "</div>"));
			var $content = $("<div class='post-content'></div>");
			$content.html(config.postList[i].desc);
			$post.append($content);
			$post.append($("<p class='readmore'><a href='" + config.ctx + config.postList[i].url + "'>More...</a></p>"));
			$("#main_content").append($post);

		}
		
	}

	/**
	 * 渲染归档 按分类和标签搜索文章
	 */
	function renderArchiveContent(option) {
		$("#nav-menu a").removeClass("current").eq(1).addClass("current");
		$("#main_content").empty();
		var postList = [];
		var obj = {};
		if(option && option.type == 'category') {
			obj = getByCategory(option.value);
		} else if (option && option.type == 'tags') {
			obj = getByTags(option.value);
		} else {
			obj = getAll();
		}
		
		$("#main_content").empty();
		var $post = $("<div class='post'></div>");
		var $archive = $("<div class='post-archive'></div>");
		for(var i = 0; i < obj.index.length; i++) {
			$archive.append($("<h2>" + obj.index[i] + "</h2>"));
			var $ul = $("<ul class='listing'></ul>");
			for(var j = 0; j < obj.data[obj.index[i]].length; j++) {
				var index = obj.data[obj.index[i]][j];
				var post = config.postList[index];
				$ul.append($("<li><span class='date'>" + post.date + "</span><a href='" + config.ctx + post.url + "'>" + post.title + "</a></li>"));
			}
			$archive.append($ul);
		}
		$post.append($archive);
		if(option && option.value) {
			$("#main_content").append($("<h1 class='label-title'>正在查看 " + option.value + " 下的文章</h1>"));
		}
		$("#main_content").append($post);
		
		function getByCategory(val) {
			var o = {
				'index' : [],
				'data' : {}
			};
			for(var i = 0; i < config.postList.length; i++) {
				if(config.postList[i].category == val) {
					var _year = config.postList[i].date.substr(0, 4);
					if(o.index.indexOf(_year) == -1) {
						o.index.push(_year);
						o.data[_year] = [];
					}
					o.data[_year].push(i);
				}
			}
			return o;

		}
		
		function getByTags(val) {
			var o = {
				'index' : [],
				'data' : {}
			};
			for(var i = 0; i < config.postList.length; i++) {
				if(config.postList[i].tags.indexOf(val) >= 0) {
					var _year = config.postList[i].date.substr(0, 4);
					if(o.index.indexOf(_year) == -1) {
						o.index.push(_year);
						o.data[_year] = [];
					}
					o.data[_year].push(i);
				}
			}
			return o;
		}
		function getAll() {
			var o = {
				'index' : [],
				'data' : {}
			};
			for(var i = 0; i < config.postList.length; i++) {
				var _year = config.postList[i].date.substr(0, 4);
				if(o.index.indexOf(_year) == -1) {
					o.index.push(_year);
					o.data[_year] = [];
				}
				o.data[_year].push(i);
			}
			return o;
		}
	}

	function renderMusic() {
		var $m = $("<audio loop autoplay></audio>");
		$m.attr("src", config.ctx + config.music.src);
	//	$("body").append($m);
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
			if(option.content === 'home') {
				renderPostContent(1);
			} else if(option.content === 'archive') {
				renderArchiveContent();
			}
			renderMusic();
			
		},
		pageTo : function(pageNum) {
			renderPostContent(pageNum);
		}

	};
})();
