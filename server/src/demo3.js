/*
const html = require('./html');
const Post = require('./Post');
let arr = [
			{
				'id': 27,
				'title': 'Nodejs总结：Express中间件',
				'date': '2017/01/12',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '在express中，中间件很重要，完全是由路由和中间件构成的一个web开发框架，本质上来说，一个express应用就是在调用各种中间件',
				'url': 'pages/nodejs/20170112/Nodejs总结：Express中间件.html'
			},
			{
				'id': 26,
				'title': 'Nodejs总结：Express路由',
				'date': '2017/01/05',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': 'express中的路由处理，相当于java Web框架中controller处理，针对不同的请求，调用不同的处理程序，给予用户不同的界面展示，express中路由是由一个url、http请求(get、post等)和若干句柄组成',
				'url': 'pages/nodejs/20170105/Nodejs总结：Express路由.html'
			},
			{
				'id': 25,
				'title': 'Nodejs总结：Express介绍',
				'date': '2017/01/01',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': 'Express是一个基于Node.js平台的极简的、灵活的web应用开发框架，类似于Java Web 开发中的 struts、springMVC 等框架',
				'url': 'pages/nodejs/20170101/Nodejs总结：Express介绍.html'
			},
			{
				'id': 24,
				'title': '实现简单的人员管理模块',
				'date': '2016/12/30',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '上一节用http模块创建了一个最最简单的web服务器，这一节继续用http模块的基本功能，实现一个人员管理模块，数据保存在文件中，这里需要用到nodejs的文件系统fs模块',
				'url': 'pages/nodejs/20161230/实现简单的人员管理模块.html'
			},
			{
				'id': 23,
				'title': 'Nodejs总结：http服务器',
				'date': '2016/12/11',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': 'javaWeb创建一个简单的服务器，需要tomcat等中间件，创建项目文件，配置web.xml文件等操作。在Node.js中，不需要这么麻烦，Node.js标准库提供了http模块，封装了一个高效的HTTP服务器，http.Server是http模块的HTTP服务器对象...',
				'url': 'pages/nodejs/20161211/Nodejs总结：http服务器.html'
			},
			{
				'id': 22,
				'title': 'Nodejs总结：文件系统',
				'date': '2016/12/01',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': "Node.js中提供了文件系统(fs)模块，用来执行文件操作，使用时调用：require('fs') 引入",
				'url': 'pages/nodejs/20161201/Nodejs总结：文件系统.html'
			},
			{
				'id': 21,
				'title': 'Nodejs总结：一些实用工具',
				'date': '2016/11/30',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '本文主要介绍nodejs中一些工具方法，涉及到util、querystring、url以及path模块的一些可能用到的方法，很多地方可能要用到这些工具方法',
				'url': 'pages/nodejs/20161130/Nodejs总结：一些实用工具.html'
			},
			{
				'id': 20,
				'title': 'Nodejs总结：事件处理',
				'date': '2016/11/29',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': 'events模块是Node.js最重要的模块，可以说是Node.js事件编程的基石',
				'url': 'pages/nodejs/20161129/Nodejs总结：事件处理.html'
			},
			{
				'id': 19,
				'title': 'Nodejs总结：模块和包',
				'date': '2016/11/25',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '我们了解了Node.js的一些基本用法，可以用node运行js脚本文件，但是在实际开发的时候是远远不够的，开发一个具有一定规模的程序不可能只用一个文件，我们需要把各个功能拆分、封装然后组合起来，模块就是为了解决这个问题',
				'url': 'pages/nodejs/20161125/Nodejs总结：模块和包.html'
			},
			{
				'id': 18,
				'title': 'Nodejs总结：常用全局对象',
				'date': '2016/11/24',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '在浏览器中，宿主对象Window，为顶级作用域对象，定义在Window对象上的属性，即为全局属性，例如：document, location等属性',
				'url': 'pages/nodejs/20161124/Nodejs总结：常用全局对象.html'
			},
			{
				'id': 17,
				'title': 'Nodejs总结：安装与使用',
				'date': '2016/11/21',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': 'Node.js的学习开始了一段时间了，做了一些小的练习，对这一阶段的内容做个总结，现在开始Node.js的安装和使用',
				'url': 'pages/nodejs/20161121/Nodejs总结：安装与使用.html'
			},
			{
				'id': 16,
				'title': 'Nodejs连接mysql数据库',
				'date': '2016/11/11',
				'category': 'nodejs',
				'tags': ['JavaScript', 'nodejs'],
				'desc': '开发过程中通常要涉及到数据库操作，node.js开发也免不了要操作数据库，由于比较熟悉mysql，所以先从mysql开始总结',
				'url': 'pages/nodejs/20161111/Nodejs连接mysql数据库.html'
			},
			{
				'id' : 15,
				'title' : 'JavaScript数组',
				'date' : '2016/09/10',
				'category' : 'JavaScript',
				'tags': ['JavaScript'],
				'desc' : 'JavaScript中数组，是程序中很常见的一种数据集合类型，而且本身很灵活强大：JavaScript是无类型的，数组元素可以是任意类型，即同一数组的不同元素可以是不同类型的；数组长度可变，可以根据实际需要增加或删除元素，动态改变数组长度',
				'url' : 'pages/JavaScript/20160910/JavaScript数组.html'
			},
			{
				'id' : 14,
				'title' : 'JavaMail创建和发送邮件',
				'date' : '2016/08/02',
				'category' : 'java',
				'tags' : ['java'],
				'desc' : 'JavaMail是用来处理email的API，可以方便的执行一些常用的邮件传输，我们可以用JavaMail创建并发送邮件，例如在java web项目中用户注册、密码认证、消息发布等很多地方会用到邮件服务，就需要用到JavaMail来创建和发送邮件',
				'url' : 'pages/java/20160802/JavaMail创建和发送邮件.html'
			},
			{
				'id' : 13,
				'title' : 'java注解',
				'date' : '2016/07/18',
				'tags' : ['java'],
				'category' : 'java',
				'desc' : '注解（Annotation），也叫元数据。一种代码级别的说明。它是JDK1.5及以后版本引入的一个特性，与类、接口、枚举是在同一个层次。它可以声明在包、类、字段、方法、局部变量、方法参数等的前面，用来对这些元素进行说明，注释, 可以替换xml配置文件。',
				'url' : 'pages/java/20160718/java注解.html'
			},
			{
				'id' : 12,
				'title' : 'canvas制作简单钟表',
				'date' : '2016/07/12',
				'tags' : ['demo', 'canvas', 'javascript'],
				'category' : 'demo',
				'desc' : '之前用html+css+JavaScript实现了一个简单钟表，但还是有一些问题，主要是一些css属性不同浏览器支持效果不一样，所以尝试用canvas实现了一个简单的钟表，效果在下方，当然了，采用canvas同样会有一些浏览器不支持。。。 这里只讨论canvas的实现方式。',
				'url' : 'pages/demo/20160712/canvas制作简单钟表.html'
			},
			{
				'id' : 11,
				'title' : '设计模式-单例模式',
				'date' : '2016/07/06',
				'tags' : ['java', '设计模式'],
				'category' : 'java',
				'desc' : '单例模式(Singleton pattern) 是一种常见的设计模式',
				'url' : 'pages/java/20160706/设计模式-单例模式.html'
			},
			{
				'id' : 10,
				'title' : '制作简单钟表',
				'date' : '2016/06/27',
				'tags' : ['demo', 'css', 'javascript'],
				'category' : 'demo',
				'desc' : "利用css+原生js制作简单的钟表。",
				'url' : 'pages/demo/20160627/制作简单钟表.html'
			},
			{
				'id' : 9,
				'title' : 'Python学习笔记：输入输出',
				'date' : '2016/05/04',
				'tags' : ['python'],
				'category' : 'Python',
				'desc' : "Python程序可以与用户交互，处理一些用户输入的信息，进行适当操作，并输出给用户结果，实现简单的输入输出处理。也可以处理文件，实现较复杂的输入输出处理",
				'url' : 'pages/Python/20160504/Python学习笔记：输入输出.html'
			},
			{
				'id' : 8,
				'title' : '制作简单日历',
				'date' : '2016/04/25',
				'tags' : ['demo', 'css', 'javascript', 'calendar'],
				'category' : 'demo',
				'desc' : "web页面中很多地方都会用到日历显示，选择等，本文用html、css、javascript实现简单的日历。完成以后的效果与页面左侧的效果差不多，可以切换上个月、下个月。也可以根据实际情况进行扩展。",
				'url' : 'pages/demo/20160425/制作简单日历.html'
			},
			{
				'id' : 7,
				'title' : 'Python学习笔记：类',
				'date' : '2016/04/22',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "Python是面向对象的程序语言，类和对象是面向对象编程的两个主要方面。类创建一个新类型，而对象是这个类的实例。",
				'url' : "pages/Python/20160422/Python学习笔记：类.html"
			},
			{
				'id' : 6,
				'title' : 'Python学习笔记：认识函数',
				'date' : '2016/04/19',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "函数是最基本的一种代码抽象方式，Python不但能够灵活的定义函数，而且内置了很多有用的函数可以直接调用。",
				'url' : 'pages/Python/20160419/Python学习笔记：认识函数.html'
			},
			{
				'id' : 5,
				'title' : 'Python学习笔记：dict',
				'date' : '2016/04/17',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "字典（dictionary）是Python中常见得一种数据类型，和list有点类似，主要的差别在于list中的元素是根据偏移来存取的，而字典中的元素是通过键来存取的。",
				'url' : 'pages/Python/20160417/Python学习笔记：dict.html'
			},
			{
				'id' : 4,
				'title' : "vim分割窗口",
				'date' : '2016/04/16',
				'tags' : ['vim'],
				'category' : 'tools',
				'desc' : "vim分页功能可以实现同时查看多个不同文件，也可以同时查看同一文件的不同位置，很常用的一个功能。",
				'url' : "pages/tools/20160416/vim分割窗口.html"
			},
			{
				'id' : 3,
				'title' : 'Python学习笔记：list和tuple',
				'date' : '2016/04/15',
				'tags' : ['Python'],
				'category' : 'Python',
				'desc' : "list 是Python 内置的一种数据类型，是一种有序的集合，可以随时添加或删除元素，可以包含任何种类的对象：数字、字符串甚至其他列表。",
				'url' : 'pages/Python/20160415/Python学习笔记：list和tuple.html'
			},
			{
				'id' : 2,
				'title' : 'vim中移动',
				'date' : '2016/04/12',
				'tags' : ['vim'],
				'category' : 'tools',
				'desc' : "在vim中，提供了很多移动的方式，怎么样更加有效快捷的移动需要长期的实践；那么第一步，就是认识这些命令...",
				'url' : 'pages/tools/20160412/vim中移动.html'
			},
			{
				'id' : 1,
				'title' : 'hello world',
				'date' : '2016/04/05',
				'tags' : ['java', 'javascript'],
				'category' : '其他',
				'desc' : "第一篇文章，就叫hello world吧！ 代码高亮显示插件用的prismjs, 简单易用，只需引入prism.js和prism.css 文件即可, 如果需要显示行号，引入line-numbers 类名。",
				'url' : "pages/其他/20160405/hello world.html"
			}
];
let posts = [];
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
}
html.pagesHtml(posts);
html.archivesHtml(posts);
html.tagsHtml(posts);
html.categoryHtml(posts);
html.demoHtml();
*/
const os = require('os');
console.log(os.type());
