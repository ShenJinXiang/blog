id: 28
title: ejs模版引擎
date: 2017-01-17
category: nodejs
tags: javascript, nodejs
description: express使用到现在的阶段，有一个很重要的问题还没解决，那就是mvc模式中的view层，之前我们只是简单的给浏览器发送一个字符串，或者拼接html字符串，对于简单的页面来说还可以实现，但是实际开发的时候显然是不合适的...

------
<h3>安装ejs</h3>
<p>ejs安装很简单，同样是使用npm工具</p>
<pre class='line-numbers language-none'>
<code>$ npm install ejs --save</code>
</pre>
<p>使用<code class='language-none'> --save </code>命令同时更新package.json中的依赖列表</p>

<h3>express中加载ejs</h3>
<pre class='line-numbers language-javascript'>
<code>// app.js
const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});</code>
</pre>
<p>上面的代码中，没有设置任何路由，不过已经加载了ejs，<code class='language-javascript'> app.set('views', path.join(__dirname, '/views')); </code> 这行代码的意思是，设置视图根目录为views目录，<code class='language-javascript'> app.set('view engine', 'ejs'); </code> 的意思是设置视图的后缀名为‘ejs’，这样就加载上了ejs模板</p>

<h3>使用ejs模板</h3>

<p>创建目录views</p>
<pre class='line-numbers language-none'>
<code>$ mkdir views</code>
</pre>
<p>在views目录下创建index.ejs文件</p>
<pre class='line-numbers language-none'>
<code>$ touch views/index.ejs</code>
</pre>
<p>编辑index.ejs</p>
<pre class='line-numbers language-html'>
<code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;title>index</title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1>express ejs</h1&gt&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<p>修改app.js 添加路由</p>
<pre class='line-numbers language-javascript'>
<code>const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// 渲染index.ejs视图
	res.render('index');
});

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});</code>
</pre>
<p>启动app.js应用</p>
<pre class='line-numbers language-none'>
<code>$ node app.js
Server running at 3000 port.</code>
</pre>
<p>浏览器中访问 "http://localhost:3000/" 结果如下:</p>
<img src='/images/nodejs/2017/01/17/015.png' />
<p>需要注意的是，<code class='language-javascript'> res.render() </code> 方法，ejs文件的路径是以配置的视图路径为根目录的，本例中，配置的视图根目录为“views”，所以要渲染 <code class='language-none'> views/index.ejs </code>，则写成<code class='language-javascript'> res.render('index') </code>，ejs文件的目录为<code class='language-none'> views/user/user.ejs </code>，那么渲染的方法为<code class='language-javascript'> res.render('user/user') </code></p>

<h3>ejs中的一些标签</h3>
<p>作为模板引擎，类似于jsp，可以执行java代码，可以从servlet传值至jsp显示，ejs中也有同样的功能，先看看一些标签列表</p>

<ul>
<li>&lt;% 'Scriptlet' 标签, 用于控制流，没有输出</li>
<li>&lt;%= 向模板输出值（带有转义）</li>
<li>&lt;%- 向模板输出没有转义的值</li>
<li>&lt;%# 注释标签，不执行，也没有输出</li>
<li>&lt;%% 输出字面的 '<%'</li>
<li>%&gt; 普通的结束标签</li>
<li>-%&gt; Trim-mode ('newline slurp') 标签, 移除随后的换行符</li>
</ul>

<p>下面我们修改index.ejs:</p>
<pre class='line-numbers language-html'>
<code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;title&gt;index</title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;express ejs&lt;/h1&gt;
&lt;%
console.log('hello ejs');
%&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>

<p>运行app.js</p>
<pre class='line-numbers language-none'>
<code>$ node app.js
Server running at 3000 port.</code>
</pre>
<p>浏览器中访问 "http://localhost:3000/" 发现页面结果与之前是一样的，打开浏览器控制台，也没有任何输出，而在后台中输出了<code class='language-none'> hello ejs </code>也就是说 ‘<%’、‘%>’之间可以执行js代码，运行在服务器端，类似于jsp中使用 <code class='language-java'> System.out.println() </code>一样的道理</p>
<p>下面我们给ejs传递值，并显示出来，修改app.js文件:</p>
<pre class='line-numbers language-javascript'>
<code>// app.js
const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// 渲染index.ejs视图
	res.render('index', {title: 'ejs 练习', name: 'shenjinxiang'});
});

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});</code>
</pre>
<p>在index.ejs中获取并给浏览器上显示值</p>
<pre class='line-numbers language-html'>
<code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;title&gt;index&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;express ejs&lt;/h1&gt;
&lt;p&gt;标题：&lt;%= title %&gt;&lt;/p&gt;
&lt;p&gt;姓名：&lt;%= name %&gt;&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<p>同样的启动app.js应用，浏览器中访问 "http://localhost:3000/" 结果如下：</p>
<img src='/images/nodejs/2016/01/17/016.png' />
<p>如果传递的值为html结构的字符串，看看是什么情况</p>
<pre class='line-numbers language-javascript'>
<code>const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// 渲染index.ejs视图
	res.render('index', {title: '<h2>ejs 练习</h2>', name: 'shenjinxiang'});
});

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});</code>
</pre>
<p>修改index.ejs</p>
<pre class='line-numbers language-html'>
<code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;title&gt;index&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;express ejs&lt;/h1&gt;
&lt;p&gt;标题：&lt;%= title %&gt;&lt;/p&gt;
&lt;%- title %&gt;
&lt;p&gt;姓名：&lt;%= name %&gt;&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<p>启动app.js应用，浏览器访问 "http://localhost:3000/" 结果如下:</p>

<img src='/images/nodejs/2016/01/17/017.png' />
<p>也可以传递数组数据的值，修改app.js</p>
<pre class='line-numbers language-javascript'>
<code>// app.js
const express = require('express');
const path = require('path');

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	let data = [
		{
			name: '张三',
			age: 18,
			address: '北京'
		},
		{
			name: '李四',
			age: 23,
			address: '上海'
		},
		{
			name: '王五',
			age: 19,
			address: '天津'
		}
	];
	// 渲染index.ejs视图
	res.render('index', {title: 'express - ejs', data: data});
});

app.listen(3000, function () {
	console.log('Server running at 3000 port.');
});</code>
</pre>
<p>修改index.ejs页面</p>
<pre class='line-numbers language-html'>
<code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;title&gt;index&lt;/title&gt;
&lt;style&gt;
table{border-collapse: collapse;width:80%;margin:10px auto;}
table th, table td {border: 1px solid #ccc; line-height: 28px;text-indent:10px;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;&lt;%= title %&gt;&lt;/h1&gt;
&lt;table&gt;
	&lt;tr&gt;
		&lt;th&gt;姓名&lt;/th&gt;
		&lt;th&gt;年龄&lt;/th&gt;
		&lt;th&gt;地址&lt;/th&gt;
	&lt;/tr&gt;
	&lt;% for (var index = 0; index &lt; data.length; index++) { %&gt;
		&lt;tr&gt;
			&lt;td&gt;&lt;%= data[index].name %&gt;&lt;/td&gt;
			&lt;td&gt;&lt;%= data[index].age %&gt;&lt;/td&gt;
			&lt;td&gt;&lt;%= data[index].address %&gt;&lt;/td&gt;
		&lt;/tr&gt;
	&lt;%}%&gt;
&lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<p>启动app.js应用，浏览器访问 "http://localhost:3000/" 效果如下:</p>
<img src-'/images/nodejs/2017/01/17/018.png' />
<h3>ejs包含</h3>
<p>ejs同样可以包含其他的ejs页面，语法为:</p>
<pre class='line-numbers language-none'>
<code>&lt;%- include(path) %&gt;</code>
</pre>
<p>这里的path要么是绝对路径，如果不是，则相对于视图根目录，即‘veiws’目录。例如，在‘views/users.ejs’ 中包含 ‘views/user/show.ejs’，应该使用<code class='language-none'> &lt;%- include('user/show') %&gt; </code></p>
<p>举个最简单的例子，比如我们可以创建head.ejs和foot.ejs文件</p>
<pre class='line-numbers language-bash'>
<code>$ touch views/head.ejs
$ touch views/foot.ejs</code>
</pre>
<p>编辑head.ejs:</p>
<pre class='line-numbers language-html'>
<code>&lt;!doctype thml&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;title&gt;Express应用&lt;/title&gt;
	&lt;!-- 
	此处添加公用css文件 link
	--&gt;
&lt;style&gt;
table{border-collapse: collapse;width:80%;margin:10px auto;}
table th, table td {border: 1px solid #ccc; line-height: 28px;text-indent:10px;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;</code>
</pre>
<p>编辑foot.ejs:</p>
<pre class='line-numbers language-html'>
<code>&lt;!--
此处添加公用JavaScript文件 
--&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<p>修改index.ejs</p>
<pre class='line-numbers language-html'>
<code>&lt;%- include('head') %&gt;
&lt;h1&gt;&lt;%= title %&gt;&lt;/h1&gt;
&lt;table&gt;
	&lt;tr&gt;
		&lt;th&gt;姓名&lt;/th&gt;
		&lt;th&gt;年龄&lt;/th&gt;
		&lt;th&gt;地址&lt;/th&gt;
	&lt;/tr&gt;
	&lt;% for (var index = 0; index &lt; data.length; index++) { %&gt;
		&lt;tr&gt;
			&lt;td&gt;&lt;%= data[index].name %&gt;&lt;/td&gt;
			&lt;td&gt;&lt;%= data[index].age %&gt;&lt;/td&gt;
			&lt;td&gt;&lt;%= data[index].address %&gt;&lt;/td&gt;
		&lt;/tr&gt;
	&lt;%}%&gt;
&lt;/table&gt;
&lt;%- include('foot') %&gt;</code>
</pre>
<p>启动app.js应用，浏览器访问 "http://localhost:3000/" 运行结果和之前的例子一样</p>
<p>到目前为止，我们已经可以用ejs的一些简单使用了，其实ejs还有很多特性，这里不做介绍了，其实是我也不会，在摸索中。。 哈~~</p>
