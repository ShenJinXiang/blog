var LS = (function() {
	var config = {
		url : 'http://shenjinxiang.github.io',
		ctx : "/blog/",
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
				'id' : 1,
				'title' : 'hello world',
				'date' : '2016/04/05',
				'tags' : ['java', 'javascript'],
				'category' : '其他',
				'desc' : "<p>第一篇文章，就叫hello world吧！ 代码高亮显示插件用的prismjs, 简单易用，只需引入prism.js和prism.css 文件即可, 如果需要显示行号，引入line-numbers 类名。</p>",
				'url' : "pages/其他/20160405/hello world.html",
				'URL' : "http://shenjinxiang.github.io/blog/pages/%E5%85%B6%E4%BB%96/20160405/hello%20world.html"
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

	function renderComment() {
		var html = "<!-- 多说评论框 start -->" +
					"<div class='ds-thread' data-thread-key='0' data-title='博客' data-url='http://shenjinxiang.github.io/blog/comment.html'></div>"+
					"<!-- 多说评论框 end -->"+
					"<!-- 多说公共JS代码 start (一个网页只需插入一次) -->"
					"<script type='text/javascript'>" + 
						"var duoshuoQuery = {short_name:'shenjinxiang'};" + 
						"(function() {" +
							"var ds = document.createElement('script');" +
							"ds.type = 'text/javascript';ds.async = true;" +
							"ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';" +
							"ds.charset = 'UTF-8';" +
							"(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);" +
						"})();"+
					"</script>" +
					"<!-- 多说公共JS代码 end -->";
		var $dspl = $("<div class='dspl_content'></div>");
		$dspl.html(html);
		$("#main_content").append($dspl);

	}

	function renderDsty(id) {
		var post = queryPostById(id);
		var html = "<!-- 多说评论框 start -->" +
					"<div class='ds-thread' data-thread-key='"+id+"' data-title='"+post.title+"' data-url='"+ post.URL +"'></div>"+
					"<!-- 多说评论框 end -->"+
					"<!-- 多说公共JS代码 start (一个网页只需插入一次) -->"
					"<script type='text/javascript'>" + 
						"var duoshuoQuery = {short_name:'shenjinxiang'};" + 
						"(function() {" +
							"var ds = document.createElement('script');" +
							"ds.type = 'text/javascript';ds.async = true;" +
							"ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';" +
							"ds.charset = 'UTF-8';" +
							"(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);" +
						"})();"+
					"</script>" +
					"<!-- 多说公共JS代码 end -->";
		var $dspl = $("<div class='dspl_content'></div>");
		$dspl.html(html);
		$("#main_content").append($dspl);
	}

	/*
	function renderMusic() {
		var $m = $("<audio loop autoplay></audio>");
		$m.attr("src", config.ctx + config.music.src);
		$("body").append($m);
	}
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

	function renderPost(option) {
		var post = queryPostById(option.id);
		$("#main_content").empty();
		var $post = $("<div class='post'></div>");
		var $title = $("<h1 class='post-title'>"+post.title+"</h1>");
		var $meta = $("<div class='post-meta'>日期："+post.date+"<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>分类："+post.category+"<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>标签："+post.tags.join(" ")+"</div>");
		$post.append($title);
		$post.append($meta);
		$post.append($($("#temp_content").html()));
		$("#main_content").append($post);
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
			if(option.content.type === 'home') {
				renderPostContent(1);
			} else if(option.content.type === 'archive') {
				renderArchiveContent();
			} else if(option.content.type === 'comment') {
				renderComment();
			} else if(option.content.type === 'post') {
				renderPost(option.content);
			} else if(option.content.comment) {
				renderDsty(option.content.id);
			}
			
		},
		pageTo : function(pageNum) {
			renderPostContent(pageNum);
		}

	};
})();
