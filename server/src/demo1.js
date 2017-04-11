let arr = [
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
];
const Post = require('./Post');

let posts = [];
let tags = [];
let category = [];
for (let i = 0; i < arr.length; i++) {
	let p = new Post();
	p.setId(arr[i].id);
	p.setTitle(arr[i].title);
	p.setDate(arr[i].date);
	p.setTags(arr[i].tags);
	p.setCategory(arr[i].category);
	p.setDescription(arr[i].desc);
	p.setUrl(arr[i].url);
	posts.push(p);

	if (category.indexOf(arr[i].category) < 0) {
		category.push(arr[i].category);
	}

	for(let j = 0; j < arr[i].tags.length; j++) {
		if (tags.indexOf(arr[i].tags[j]) < 0) {
			tags.push(arr[i].tags[j]);
		}
	}
}


console.log(tags);
console.log(category);
console.log("----------------------------");

const config = require('../config');
console.log('-------------config--------------')
console.log(config);

/**
 * 获取顶部html
 */
function getHeaderHtml() {
	return "<!doctype html>" +
					'<html> ' + 
					'<head> ' + 
					'<meta charset="utf-8"> ' + 
					'<meta name="X-UA-Compatible" content="IE=edge"> ' + 
					'<meta name="author" content="shenjinxiang,likestarsjx@gmail.com"> ' + 
					'<meta name="description" content="申锦祥的个人博客"> ' + 
					'<meta name="keywords" content="Java,JavaScript,HTML,CSS,canvas,Linux,shenjinxiang,LikeStar"> ' + 
					'<meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0" name="viewport"> ' + 
					'<meta content="yes" name="apple-mobile-web-app-capable"> ' + 
					'<meta content="black" name="apple-mobile-web-app-status-bar-style"> ' + 
					'<meta content="telephone=no" name="format-detection"> ' + 
					'<meta name="renderer" content="webkit"> ' + 
					'<link rel="icon" href="/images/title.ico" type="image/x-ico"> ' + 
					'<link rel="stylesheet" href="/css/style.css"> ' + 
					'<link rel="stylesheet" href="/plugin/prism/prism.css"> ' + 
					'<title>LikeStar</title> ' + 
					'</head> ' + 
					'<body>';
}

/**
 * 获取底部html
 */
function getFooterHtml() {
	return '<script src="/plugin/jquery.js"></script>' +
					'<script src="/plugin/prism/prism.js"></script>' + 
					'<script src="/js/common.js"></script>' +
					'</body>' +
					'</html>';
}

/**
 * 标题部分html
 */
function getSidebarHtml() {
	return '<div class="sidebar fadeInDown animated">' +
		'	<div class="logo-title">' +
		'		<div class="title">' + 
		'			<h1>' + 
		'				<a href="/">' + config.title + '<span>.BLOG</span></a>' +
		'			</h1>' + 
		'			<div class="description">' + 
		'				<p>' + config.description + '</p>' + 
		'			</div>' + 
		'		</div>' + 
		'	</div>' + 
		'	<div class="footer">' + 
		'		<span>ShenJinXiang</span>' + 
		'	</div>' + 
		'</div>';
}


/**
 * 菜单部分html
 */
function getMenuHtml(current) {
	return '<div class="page-top animated fadeInDown">' + 
	'	<ul class="nav">' + 
	'		<li>' + 
	'			<a href="' + config.url.index + '" ' + (current == 1 ? 'class="current"' : '') + '>' + 
	'				<i class="baseline"></i>' + 
	'				首 页' + 
	'			</a>' + 
	'		</li>' + 
	'		<li>' + 
	'			<a href="' + config.url.archives + '" ' + (current == 2 ? 'class="current"' : '') + '>' + 
	'				<i class="baseline"></i>' + 
	'				归 档' + 
	'			</a>' + 
	'		</li>' + 
	'		<li>' + 
	'			<a href="' + config.url.demo + '" ' + (current == 3 ? 'class="current"' : '') + '>' + 
	'				<i class="baseline"></i>' + 
	'				DEMO' + 
	'			</a>' + 
	'		</li>' + 
	'	</ul>' + 
	'</div>';

}

/**
 * 获取内容部分html
 * option
 *  type:
 *   page 首页 分页
 *   post 具体文章
 *   archives 归档
 *   demo demo
 *  pageNum : 页码
 */
function getContentHtml(options) {
	if (options.type === 'page') {
		return getPageContentHtml(options);
	} else if (options.type === 'archives') {
		return getArchivesContentHtml();
	} else if (options.type === 'demo') {
		return getDemoContentHtml();
	}

	function getDemoContentHtml() {
		const demoarr = config.demo;

		let _html = 
			'<div class="main">' +
			'	 <div class="autopagerize_page_element">' +
			'		 <div class="content">' +
			'			 <div class="archive animated fadeInDown">' +
			'				 <ul class="list-with-title">' +
			'					 <div class="archive">' +
			'					   <ul class="listing">';

		for (let i = 0; i < demoarr.length; i++) {
			_html += 
			'<div class="listing-item">' +
			'	<div class="listing-post">' +
			'		<a href="' + demoarr[i].url + '" title="' + demoarr[i].title + '">' + demoarr[i].title + '</a>' +
			'		<div class="post-time">' +
			'			<span class="date">' + demoarr[i].date + '</span>' +
			'		</div>' +
			'	</div>' +
			'</div>';
		}
		_html += 
			'            </ul>' +
			'          </div>' +
			'        </ul>' +
			'      </div>' +
			'    </div>' +
			'  </div>' +
			'</div>';
		return _html;
	}

	function getArchivesContentHtml() {
		let _html = 
			'<div class="main">' +
			'	 <div class="autopagerize_page_element">' +
			'		 <div class="content">' +
			'			 <div class="archive animated fadeInDown">' +
			'				 <ul class="list-with-title">' +
			'					 <div class="archive">';

		_html += 
			'          </div>' +
			'        </ul>' +
			'      </div>' +
			'    </div>' +
			'  </div>' +
			'</div>';


	}

	function getPageContentHtml(options) {
		let pageNum = options.pageNum || 1;
		let _posts = posts.slice((pageNum - 1) * config.pageSize, pageNum * config.pageSize);
		let _html = 
			'<div class="main">' +
			'	<div class="autopagerize_page_element">' +
			'		<div class="content">';
		for(let i = 0 ; i < _posts.length; i++) {
			_html +=
					'<div class="post animated fadeInDown">' +
					'	<div class="post-title">' +
					'		<h3>' +
					'			<a href="' + _posts[i].url + '">' + _posts[i].title + '</a>' +
					'		</h3>' +
					'	</div>' +
					'	<div class="post-content">' +
					_posts[i].description + 
					'	</div>' +
					'	<div class="post-footer">' +
					'		<div class="meta">' + 
					'			<div class="info">' +
					'				<span>日期:</span>' +
					'				<span>' + _posts[i].getDateStr() + '</span>' +
					'				<span class="delimiter">|</span>' +
					'				<span>分类:</span>' +
					'				<a href="/category/' + _posts[i].category + '">' + _posts[i].category + '</a>' +
					'				<span class="delimiter">|</span>' +
					'				<span>标签:</span>';
			for (let j = 0; j < _posts[i].tags.length; j++) {
				_html += 
					'				<a href="/tags/' + _posts[i].tags[j] + '">' + _posts[i].tags[j] + '</a>';
			}
			_html +=
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>';
		}

		
		_html +=
				'<div class="pagination">' +
				'	<ul class="clearfix">';
		if (pageNum != 1) {
			_html +=
				'		<li class="pre pagbuttons">' +
				'			<a role="navigation" href="' + ((pageNum == 2) ? "/" : ("/pages/" + (pageNum - 1))) + '" class="btn">' +
				'				<i class="baseline"></i>' +
				'				上一页' +
				'			</a>' +
				'		</li>';
		}
		if (pageNum * config.pageSize < posts.length) {
			_html +=
				'		<li class="next pagbuttons">' +
				'			<a role="navigation" href="/pages/' + (pageNum + 1) + '" class="btn">' +
				'				<i class="baseline"></i>' +
				'				下一页' +
				'			</a>' +
				'		</li>';
		}
		_html +=
				'	</ul>' +
				'</div>';
		return _html;
	}
}



const fs = require('fs');
function doPages() {
	let totalPage = Math.ceil(posts.length / config.pageSize);

	for (let i = 1; i <= totalPage; i++) {
		_html = getHeaderHtml() + getSidebarHtml() + getMenuHtml(1) + getContentHtml({type: 'page', pageNum: i}) + getFooterHtml();
		let path = './pages/' + i + '/index.html';
		path = (i == 1) ? './index.html' : path;
		fs.writeFile(path, _html, function(err) {
			if (err) throw err;
			console.log(path + '写入完成');
		});

	}

	_html = getHeaderHtml() + getSidebarHtml() + getMenuHtml(3) + getContentHtml({type: 'demo'}) + getFooterHtml();
	let path = './demo/index.html';
	fs.writeFile(path, _html, function(err) {
		if (err) throw err;
		console.log(path + '写入完成');
	});
}

doPages();
