id: 25
title: Nodejs总结：Express介绍
date: 2017-01-03
category: nodejs
tags: javascript, nodejs
description: Express是一个基于Node.js平台的极简的、灵活的web应用开发框架，类似于Java Web 开发中的 struts、springMVC 等框架

------
<p>Express是一个基于Node.js平台的极简的、灵活的web应用开发框架，类似于Java Web 开发中的 struts、springMVC 等框架</p>
<h3>安装Express</h3>
<p>1. 创建一个目录，以此目录做为工作目录</p>
<pre class='line-numbers language-none'>
<code>$ mkdir express_demo
$ cd express_demo</code>
</pre>
<p>2. 通过 npm init 命令为应用创建一个 package.json 文件，此命令要求输入多次参数，分别表示项目的名称、版本、说明、作者等信息，按实际情况即可，影响不大</p>
<pre class='line-numbers language-none'>
<code>$ npm init</code>
</pre>
<p>3. 安装express，并保存到package.json中的依赖列表中</p>
<pre class='line-numbers language-none'>
<code>$ npm install express --save</code>
</pre>
<p>这样就在项目中安装好了express，如果想临时使用express而不添加到依赖列表中的话，去掉'--save'参数即可</p>
<pre class='line-numbers language-none'>
<code>$ npm install express</code>
</pre>
<p>安装 Node 模块时，如果指定了 --save 参数，那么此模块将被添加到 package.json 文件中 dependencies 依赖列表中。 然后通过 npm install 命令即可自动安装依赖列表中所列出的所有模块</p>
<h3>第一个例子</h3>
<p>项目中安装好express以后，即可开始开发一个最简单的应用了，工作目录中创建index.js，内容:</p>
<pre class='line-numbers language-javascript'>
<code>// index.js
const express = require('express');

let app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000, function () {
    console.log('Server running ar 3000 port.');
});</code>
</pre>
<p><i>运行index.js文件</i></p>
<pre class='line-numbers language-none'>
<code>$ node index.js
Server running ar 3000 port. </code>
</pre>
<p>服务器已经启动了，浏览器中输入http:localhost:3000/ 进入页面，即可看到Hello World 字样</p>
<h3>添加路由</h3>
<p>将index.js内容修改，添加更多的路由配制：</p>
<pre class='line-numbers language-javascript'>
<code>// index.js
const express = require('express');

let app = express();

app.get('/', function (req, res) {
    res.type('text/plain');
    res.send('index');
});

app.get('/user', function (req, res) {
    res.type('text/plain');
    res.send('user');
});

app.get('/person', function (req, res) {
    res.type('text/plain');
    res.send('person');
});

app.listen(3000, function () {
    console.log('Server running ar 3000 port.');
});</code>
</pre>
<p><i>运行js文件</i></p>
<pre class='line-numbers language-none'>
<code>$ node index.js
Server running ar 3000 port. </code>
</pre>
<p>浏览器中分别访问： "http://localhost:3000/"、 "http://localhost:3000/user/"、 "http://localhost:3000/person/" 可以看到分别按对应的路由获得结果，不过这里有几点说明</p>
<ol>
<li>app.get() 方法用于添加一个路由，比如app.get('/user', function () {...});，当用户get方式访问"http://localhost:3000/user/" 时执行此处的回调函数。与http动作相关联，如果是一个post请求，可以用app.post(()方法添加路由</li>
<li>路由匹配时忽略大小写，忽略查询字符串，对于'／user'，'/', '/USER'，/user?username=admin‘，'/user/?user=admin'等路径都是一样的</li>
<li>响应信息res参数，使用res.type()方法设置响应的'Context-Type'的值，res.status() 方法设置响应状态码，默认为200状态码</li>
</ol>
<h3>添加404和500处理</h3>
<p>继续修改index.js</p>
<pre class='line-numbers language-javascript'>
<code>const express = require('express');

let app = express();

app.get('/', function (req, res) {
    res.type('text/plain');
    res.send('index');
});

app.get('/user', function (req, res) {
    res.type('text/plain');
    res.send('user');
});

app.get('/person', function (req, res) {
    console.log(o);
    res.type('text/plain');
    res.send('person');
});

// 404
app.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 - Not Found.');
});

// 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error.');
});

app.listen(3000, function () {
    console.log('Server running ar 3000 port.');
});</code>
</pre>
<p>在这里针对404和500的处理，只是给用户显示了一段话，其中针对'/person'的请求，专门添加了错误的代码，所以如果浏览器中访问 "http://localhost:3000/person" 的话，会显示500处理的结果，实际开发的时候，可以给用户更友好的界面，需要注意的是顺序问题，404和500状态的处理代码，需要放在绑定路由的代码后面</p>
