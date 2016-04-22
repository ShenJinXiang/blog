var LS = (function() {
	var config = {
		url : 'http://shenjinxiang.com',
		//ctx : "/",
		//url : 'http://shenjinxiang.github.io',
		ctx : "/blog/",
	    logo : {
			'title' : 'LikeStar',
			'url' : 'index.html'
		},
	    description : '申锦祥的博客',
		music_src : "music/网易游戏 - 傲来.mp3",
	    menu : [
			{
				'title' : '首页',
				'url' : 'index.html'
			},
			{
				'title' : '归档',
				'url' : 'archive.html'
			},
			{
				'title' : "留言",
				'url' : 'comment.html'
			}
		],
		sideBar : ['category', 'tags', 'posts'],
		postList : [
			{
				'id' : 7,
				'title' : 'Python学习笔记：类',
				'date' : '2016/04/22',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "<p>Python是面向对象的程序语言，类和对象是面向对象编程的两个主要方面。类创建一个新类型，而对象是这个类的实例。</p>",
				'url' : "pages/Python/20160422/Python学习笔记：类.html"
			},
			{
				'id' : 6,
				'title' : 'Python学习笔记：认识函数',
				'date' : '2016/04/19',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "<p>函数是最基本的一种代码抽象方式，Python不但能够灵活的定义函数，而且内置了很多有用的函数可以直接调用。</p>",
				'url' : 'pages/Python/20160419/Python学习笔记：认识函数.html'
			},
			{
				'id' : 5,
				'title' : 'Python学习笔记：dict',
				'date' : '2016/04/17',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "<p>字典（dictionary）是Python中常见得一种数据类型，和list有点类似，主要的差别在于list中的元素是根据偏移来存取的，而字典中的元素是通过键来存取的。</p>",
				'url' : 'pages/Python/20160417/Python学习笔记：dict.html'
			},
			{
				'id' : 4,
				'title' : "vim分割窗口",
				'date' : '2016/04/16',
				'tags' : ['vim'],
				'category' : 'tools',
				'desc' : "<p>vim分页功能可以实现同时查看多个不同文件，也可以同时查看同一文件的不同位置，很常用的一个功能。</p>",
				'url' : "pages/tools/20160416/vim分割窗口.html"
			},
			{
				'id' : 3,
				'title' : 'Python学习笔记：list和tuple',
				'date' : '2016/04/15',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "<p>list 是Python 内置的一种数据类型，是一种有序的集合，可以随时添加或删除元素，可以包含任何种类的对象：数字、字符串甚至其他列表。</p>",
				'url' : 'pages/Python/20160415/Python学习笔记：list和tuple.html'
			},
			{
				'id' : 2,
				'title' : 'vim中移动',
				'date' : '2016/04/12',
				'tags' : ['vim'],
				'category' : 'tools',
				'desc' : "<p>在vim中，提供了很多移动的方式，怎么样更加有效快捷的移动需要长期的实践；那么第一步，就是认识这些命令...</p>",
				'url' : 'pages/tools/20160412/vim中移动.html'
			},
			{
				'id' : 1,
				'title' : 'hello world',
				'date' : '2016/04/05',
				'tags' : ['java', 'javascript'],
				'category' : '其他',
				'desc' : "<p>第一篇文章，就叫hello world吧！ 代码高亮显示插件用的prismjs, 简单易用，只需引入prism.js和prism.css 文件即可, 如果需要显示行号，引入line-numbers 类名。</p>",
				'url' : "pages/其他/20160405/hello world.html"
			}
		]
	};

	/**
	 * 渲染body中整体框架
	 */
	function renderMain() {
		var html = '<div class="header">'+
			'<div class="content">'+
				'<div class="header-content">'+
					'<div class="site-name">'+
						'<a id="logo" href="#"></a>'+
						'<p class="description" id="description"></p>'+
					'</div>'+
					'<div id="nav-menu">'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="layout">'+
			'<div class="content">'+
				'<div class="main-content">'+
					'<div class="content-box">'+
						'<div class="content-container" id="main_content">'+
						'</div>'+
					'</div>'+
					'<div class="side-box">'+
						'<div id="sidebar">'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="footer">'+
			'<div class="content">'+
				'&copy; ShenJinXiang.'+
			'</div>'+
		'</div>';
		$("body").prepend($(html));
	}

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

	function rendermusicBar() {
		var $music = $("<audio loop autoplay></audio>");
		$music.attr("src", config.music_src);
		$("body").append($music);
	}

	/**
	 * 渲染时间
	 */
	function rendertimeBar() {
		console.dir(getCurrentTime());
		var $canvas = $("<canvas></canvas>");
		$canvas.width = 10;
		$canvas.height = 10;
		var $widget = $("<div class='widget'></widget>");
		$widget.append($canvas);
		$("#sidebar").append($canvas);
		function getCurrentTime() {
			var arr = [];
			var _date = new Date();
			var _hour = _date.getHours();
			var _minute = _date.getMinutes();
			var _seconds = _date.getSeconds();
			console.log("hour : " + _hour + "  minute :" + _minute + "  second :" + _seconds);
			arr.push(Math.floor(_hour / 10));
			arr.push(_hour % 10);
			arr.push(Math.floor(_minute / 10));
			arr.push(_minute % 10);
			arr.push(Math.floor(_seconds / 10));
			arr.push(_seconds % 10);
			return arr;
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


	/**
	 * 根据文章id获取文章信息
	 */
	function queryPostById(id) {
		var post = {};
		for(var i = 0; i < config.postList.length; i++) {
			if(config.postList[i].id == id) {
				post = config.postList[i];
			}
		}
		return post;
	}

	/**
	 * 渲染文章 内容
	 */
	function renderPost(option) {
		var post = queryPostById(option.id);
		$("#main_content").empty();
		var $post = $("<div class='post'></div>");
		var $title = $("<h1 class='post-title'>"+post.title+"</h1>");
		var $meta = $("<div class='post-meta'>日期："+post.date+"<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>分类："+post.category+"<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>标签："+post.tags.join(" ")+"</div>");
		$post.append($title);
		$post.append($meta);
		$post.append($($("#temp_content").html()));
		$post.append(getPrevAndNextHtml());
		var $pl = $("<div class='ds-thread' data-thread-key='"+post.id+"' data-title='"+post.title+"' data-url='"+config.url + post.url+"'></div>");
		$post.append($pl);
	
		$("#main_content").append($post);

		function getPrevAndNextHtml() {
			var prev = queryPostById(post.id + 1);
			var next = queryPostById(post.id - 1);
			var _$html = $("<div class='post-nav'></div>");
			if(prev && prev.title) {
				_$html.append("<a class='prev' href='" + config.ctx + prev.url + "'>&lt;&nbsp;" + prev.title + "</a>");
			}
			if(next && next.title) {
				_$html.append("<a class='next' href='" + config.ctx + next.url + "'>" + next.title + "&nbsp;&gt;</a>");
			}
			return _$html;
		}
	}

	/**
	 * 渲染留言 页面
	 */
	function renderComment() {
		var $post = $("<div class='post'></post>");
		$post.append($('<div class="ds-thread" data-thread-key="0" data-title="博客" data-url="http://shenjinxiang.github.io/blog/comment.html"></div>'));
		$("#main_content").empty().append($post);
	}

	return {
		init : function(option) {
			renderMain();
			// 顶部
			readerHeader(option.currentMenu - 1);

			// 侧边栏
			var sidebar = option.sidebar; 
			for( var i = 0; i < sidebar.length; i++) {
				var funName = "render" + sidebar[i] + "Bar";
				eval(funName + '()');
			}
			if(option.content.type === 'home') {		// 主页
				renderPostContent(1);
			} else if(option.content.type === 'archive') {	// 归档
				renderArchiveContent();
			} else if(option.content.type === 'post') {	// 文章
				renderPost(option.content);
			} else if(option.content.type === 'comment') {	// 留言
				renderComment();
			}
		},
		pageTo : function(pageNum) {
			renderPostContent(pageNum);
		},
		queryPostById : function(id) {
			return queryPostById(id);
		}

	};
})();
