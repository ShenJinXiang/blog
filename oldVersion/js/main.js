var LS = (function() {
	var config = {
		url : 'http://www.shenjinxiang.com',
		ctx : "/",	// 正式
		//ctx : "/blog/", // windows
		//ctx : "/Users/shenjinxiang/Documents/blog/", // mac
	  logo : {
			'title' : 'LikeStar',
			'url' : 'index.html'
		},
		pageSize : 10,
	  description : '申锦祥的博客',
		//music_src : "music/网易游戏 - 傲来.mp3",
		music_src: "music/Opinions of the Misinformed.mp3",
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
				'id': 27,
				'title': 'Nodejs总结：Express中间件',
				'date': '2017/01/12',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>在express中，中间件很重要，完全是由路由和中间件构成的一个web开发框架，本质上来说，一个express应用就是在调用各种中间件</p>',
				'url': 'pages/nodejs/20170112/Nodejs总结：Express中间件.html'
			},
			{
				'id': 26,
				'title': 'Nodejs总结：Express路由',
				'date': '2017/01/05',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>express中的路由处理，相当于java Web框架中controller处理，针对不同的请求，调用不同的处理程序，给予用户不同的界面展示，express中路由是由一个url、http请求(get、post等)和若干句柄组成</p>',
				'url': 'pages/nodejs/20170105/Nodejs总结：Express路由.html'
			},
			{
				'id': 25,
				'title': 'Nodejs总结：Express介绍',
				'date': '2017/01/01',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>Express是一个基于Node.js平台的极简的、灵活的web应用开发框架，类似于Java Web 开发中的 struts、springMVC 等框架</p>',
				'url': 'pages/nodejs/20170101/Nodejs总结：Express介绍.html'
			},
			{
				'id': 24,
				'title': '实现简单的人员管理模块',
				'date': '2016/12/30',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>上一节用http模块创建了一个最最简单的web服务器，这一节继续用http模块的基本功能，实现一个人员管理模块，数据保存在文件中，这里需要用到nodejs的文件系统fs模块</p>',
				'url': 'pages/nodejs/20161230/实现简单的人员管理模块.html'
			},
			{
				'id': 23,
				'title': 'Nodejs总结：http服务器',
				'date': '2016/12/11',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>javaWeb创建一个简单的服务器，需要tomcat等中间件，创建项目文件，配置web.xml文件等操作。在Node.js中，不需要这么麻烦，Node.js标准库提供了http模块，封装了一个高效的HTTP服务器，http.Server是http模块的HTTP服务器对象...</p>',
				'url': 'pages/nodejs/20161211/Nodejs总结：http服务器.html'
			},
			{
				'id': 22,
				'title': 'Nodejs总结：文件系统',
				'date': '2016/12/01',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': "<p>Node.js中提供了文件系统(fs)模块，用来执行文件操作，使用时调用：require('fs') 引入</p>",
				'url': 'pages/nodejs/20161201/Nodejs总结：文件系统.html'
			},
			{
				'id': 21,
				'title': 'Nodejs总结：一些实用工具',
				'date': '2016/11/30',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>本文主要介绍nodejs中一些工具方法，涉及到util、querystring、url以及path模块的一些可能用到的方法，很多地方可能要用到这些工具方法</p>',
				'url': 'pages/nodejs/20161130/Nodejs总结：一些实用工具.html'
			},
			{
				'id': 20,
				'title': 'Nodejs总结：事件处理',
				'date': '2016/11/29',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>events模块是Node.js最重要的模块，可以说是Node.js事件编程的基石</p>',
				'url': 'pages/nodejs/20161129/Nodejs总结：事件处理.html'
			},
			{
				'id': 19,
				'title': 'Nodejs总结：模块和包',
				'date': '2016/11/25',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>我们了解了Node.js的一些基本用法，可以用node运行js脚本文件，但是在实际开发的时候是远远不够的，开发一个具有一定规模的程序不可能只用一个文件，我们需要把各个功能拆分、封装然后组合起来，模块就是为了解决这个问题</p>',
				'url': 'pages/nodejs/20161125/Nodejs总结：模块和包.html'
			},
			{
				'id': 18,
				'title': 'Nodejs总结：常用全局对象',
				'date': '2016/11/24',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>在浏览器中，宿主对象Window，为顶级作用域对象，定义在Window对象上的属性，即为全局属性，例如：document, location等属性</p>',
				'url': 'pages/nodejs/20161124/Nodejs总结：常用全局对象.html'
			},
			{
				'id': 17,
				'title': 'Nodejs总结：安装与使用',
				'date': '2016/11/21',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>Node.js的学习开始了一段时间了，做了一些小的练习，对这一阶段的内容做个总结，现在开始Node.js的安装和使用</p>',
				'url': 'pages/nodejs/20161121/Nodejs总结：安装与使用.html'
			},
			{
				'id': 16,
				'title': 'Nodejs连接mysql数据库',
				'date': '2016/11/11',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '<p>开发过程中通常要涉及到数据库操作，node.js开发也免不了要操作数据库，由于比较熟悉mysql，所以先从mysql开始总结</p>',
				'url': 'pages/nodejs/20161111/Nodejs连接mysql数据库.html'
			},
			{
				'id' : 15,
				'title' : 'JavaScript数组',
				'date' : '2016/09/10',
				'category' : 'JavaScript',
				'tags': ['JavaScript'],
				'desc' : '<p>JavaScript中数组，是程序中很常见的一种数据集合类型，而且本身很灵活强大：JavaScript是无类型的，数组元素可以是任意类型，即同一数组的不同元素可以是不同类型的；数组长度可变，可以根据实际需要增加或删除元素，动态改变数组长度</p>',
				'url' : 'pages/JavaScript/20160910/JavaScript数组.html'
			},
			{
				'id' : 14,
				'title' : 'JavaMail创建和发送邮件',
				'date' : '2016/08/02',
				'category' : 'java',
				'tags' : ['java'],
				'desc' : '<p>JavaMail是用来处理email的API，可以方便的执行一些常用的邮件传输，我们可以用JavaMail创建并发送邮件，例如在java web项目中用户注册、密码认证、消息发布等很多地方会用到邮件服务，就需要用到JavaMail来创建和发送邮件</p>',
				'url' : 'pages/java/20160802/JavaMail创建和发送邮件.html'
			},
			{
				'id' : 13,
				'title' : 'java注解',
				'date' : '2016/07/18',
				'tags' : ['java'],
				'category' : 'java',
				'desc' : '<p>注解（Annotation），也叫元数据。一种代码级别的说明。它是JDK1.5及以后版本引入的一个特性，与类、接口、枚举是在同一个层次。它可以声明在包、类、字段、方法、局部变量、方法参数等的前面，用来对这些元素进行说明，注释, 可以替换xml配置文件。</p>',
				'url' : 'pages/java/20160718/java注解.html'
			},
			{
				'id' : 12,
				'title' : 'canvas制作简单钟表',
				'date' : '2016/07/12',
				'tags' : ['demo', 'canvas', 'javascript'],
				'category' : 'demo',
				'desc' : '<p>之前用html+css+JavaScript实现了一个简单钟表，但还是有一些问题，主要是一些css属性不同浏览器支持效果不一样，所以尝试用canvas实现了一个简单的钟表，效果在下方，当然了，采用canvas同样会有一些浏览器不支持。。。 这里只讨论canvas的实现方式。</p>',
				'url' : 'pages/demo/20160712/canvas制作简单钟表.html'
			},
			{
				'id' : 11,
				'title' : '设计模式-单例模式',
				'date' : '2016/07/06',
				'tags' : ['java', '设计模式'],
				'category' : 'java',
				'desc' : '<p>单例模式(Singleton pattern) 是一种常见的设计模式</p>',
				'url' : 'pages/java/20160706/设计模式-单例模式.html'
			},
			{
				'id' : 10,
				'title' : '制作简单钟表',
				'date' : '2016/06/27',
				'tags' : ['demo', 'css', 'javascript'],
				'category' : 'demo',
				'desc' : "<p>利用css+原生js制作简单的钟表。</p>",
				'url' : 'pages/demo/20160627/制作简单钟表.html'
			},
			{
				'id' : 9,
				'title' : 'Python学习笔记：输入输出',
				'date' : '2016/05/04',
				'tags' : ['python'],
				'category' : 'Python',
				'desc' : "<p>Python程序可以与用户交互，处理一些用户输入的信息，进行适当操作，并输出给用户结果，实现简单的输入输出处理。也可以处理文件，实现较复杂的输入输出处理</p>",
				'url' : 'pages/Python/20160504/Python学习笔记：输入输出.html'
			},
			{
				'id' : 8,
				'title' : '制作简单日历',
				'date' : '2016/04/25',
				'tags' : ['demo', 'css', 'javascript', 'calendar'],
				'category' : 'demo',
				'desc' : "<p>web页面中很多地方都会用到日历显示，选择等，本文用html、css、javascript实现简单的日历。完成以后的效果与页面左侧的效果差不多，可以切换上个月、下个月。也可以根据实际情况进行扩展。</p>",
				'url' : 'pages/demo/20160425/制作简单日历.html'
			},
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
	 * 渲染日历
	 */
	function renderdateBar() {
		var $widget = $("<div class='widget' style='margin-bottom:10px;'>" +
				"<div class='widget-title calendar-title-box'>" +
				"<span class='prev-month'></span>" + 
				"<span id='calendar_title' ></span>" + 
				"<span class='next-month'></span>" + 
				"</div>" +
				"</div>");
		var $div = $("<div></div>");
		var $table = $("<table id='calendar_table'></table>");
		$table.append($("<tr>" + 
					"<th>日</th>" +
					"<th>一</th>" +
					"<th>二</th>" +
					"<th>三</th>" +
					"<th>四</th>" +
					"<th>五</th>" +
					"<th>六</th>" +
					"</tr>"));
		for(var i = 0; i < 6; i++) {
			$table.append($("<tr>" +
						"<td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
						"</tr>"));
		}
		$div.append($table);
		$widget.append($div);
		$("#sidebar").append($widget);

		var monthObj = (function(){
			var __date = new Date();
			return {
				setDate : function(date) {
					__date = date;
				},
				getDate : function() {
					return __date;
				}
			};
		})();
		showCalendarData();

		$(".prev-month").bind('click', function(){
			var date = monthObj.getDate();
			monthObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
			showCalendarData();
		});

		$(".next-month").bind('click', function(){
			var date = monthObj.getDate();
			monthObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
			showCalendarData();
		})
		/**
		 *  设置数据
		 */
		function showCalendarData() {
			var year = monthObj.getDate().getFullYear();
			var month = monthObj.getDate().getMonth() + 1;
			// 顶部显示数据
			var str = year + "年" + ((month > 9) ? "" + month : "0" + month) + "月";
			$("#calendar_title").text(str);

			// 表格数据
			var firstDay = new Date(year, month - 1, 1);
			for(var i = 0; i <= 42; i++) {
				var thisD = new Date(year, month - 1, i + 1 - firstDay.getDay());
				var thisDStr = getDateStr(thisD);
				$("#calendar_table").find("td").eq(i).text(thisD.getDate()).attr("data", thisDStr);
				if(thisDStr == getDateStr(new Date())) {
					$("#calendar_table").find("td").eq(i).removeClass().addClass('currentDay');
				} else if(thisDStr.substr(0, 6) == getDateStr(firstDay).substr(0, 6)) {
					$("#calendar_table").find("td").eq(i).removeClass().addClass('currentMonth');
				} else {
					$("#calendar_table").find("td").eq(i).removeClass().addClass('otherMonth');
				}
			}
		}

		function getDateStr(date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var d = date.getDate();
			month = (month > 9) ? ('' + month) : ('0' + month);
			d = (d > 9) ? ('' + d) : ('0' + d);
			return year + '' + month + '' + d;
		}
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
			if(i >= 10) {break}
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
		var pageSize = config.pageSize;
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
		$("#main_content").append(getPageContent(pageNum));
		
	}

	function getPageContent(pageNum) {
		var $pageContent = $("<div class='page-navigator'></div>");
		var pageLength = Math.ceil(config.postList.length / config.pageSize);
		console.log("pageSize:" + config.pageSize + "\tpostSize:" + config.postList.length + "\t pageLength:" + pageLength);
		var $prevPage = $("<span class='prev-page page-span' onclick='LS.pageTo(" + (pageNum - 1) + ")'>上一页</span>");
		var $nextPage = $("<span class='next-page page-span' onclick='LS.pageTo(" + (pageNum + 1) + ")'>下一页</span>");
		if(pageNum > 1) {
			$pageContent.append($prevPage);
		}
		if(pageLength <= 5) {
			for(var index = 1; index <= pageLength; index++) {
				$pageContent.append($("<span class='page-span " + ((index == pageNum) ? 'current' : '') + "' onclick='LS.pageTo(" + index + ")'>" + index + "</span>"));
			}
		}
		if(pageNum < pageLength) {
			$pageContent.append($nextPage);
		}
		return $pageContent;
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
