id: 20
title: Nodejs总结：一些实用工具
date: 2016-11-30
category: nodejs
tags: javascript, nodejs
description: 本文主要介绍nodejs中一些工具方法，涉及到util、querystring、url以及path模块的一些可能用到的方法，很多地方可能要用到这些工具方法

------
<p>本文主要介绍nodejs中一些工具方法，涉及到util、querystring、url以及path模块的一些可能用到的方法，很多地方可能要用到这些工具方法</p>
<h3>util工具模块</h3>
<p>util模块属于nodejs核心包，不过不是全局对象，通过：<code class='language-javascript'>require('util')</code> 引入该包</p>
<h4>util.log(string)</h4>
<p>将string参数的内容加上当前时间戳，输出到stdout标准输出</p>
<pre class='line-numbers language-javascript'>
<code>// utilLog.js
let util = require('util');
util.log('shenjinxiang');</code>
</pre>
<i>运行js文件:</i>
<pre class='line-numbers language-none'>
<code>$node utilLog.js
25 Nov 09:53:48 - shenjinxiang</code>
</pre>
<h4>util.inspect(object[, showHidden][, depth])</h4>
<p>以字符串形式返回object对象的结构信息，调试程序时实用</p>
<b>参数说明:</b>
<ul>
<li>object - 要显示的对象</li>
<li>showHidden - 默认值为false，如果为true，object对象的不可枚举属性也会显示</li>
<li>depth - 格式化对象信息时的递归次数，默认为2层</li>
</ul>
<b>例子:</b>
<pre class='line-numbers language-javascript'>
<code>// utilInspect.js
let util = require('util');
let obj = {
    x: 1,
    y: 2,
    z: [1, 2, 3, 4, 5, [6, 7]],
    m: {x: 1, y: 2},
    n: {x: {a: 1, b: 2}, y: {a: ['a', 'b'], b: {aa: 1, bb: 2, cc: 3}}}
};
console.log(util.inspect(obj));
console.log('--------------');
console.log(util.inspect(obj, true)); // 同时也显示可不枚举属性
console.log('--------------');
console.log(util.inspect(obj, true, 4)); // 设置格式化层数</code>
</pre>
<b>运行js文件:</b>
<pre class='line-numbers language-none'>
<code>$node utilInspect.js
{ x: 1,
  y: 2,
  z: [ 1, 2, 3, 4, 5, [ 6, 7 ] ],
  m: { x: 1, y: 2 },
  n: { x: { a: 1, b: 2 }, y: { a: [Object], b: [Object] } } }
--------------
{ x: 1,
  y: 2,
  z: [ 1, 2, 3, 4, 5, [ 6, 7, [length]: 2 ], [length]: 6 ],
  m: { x: 1, y: 2 },
  n: { x: { a: 1, b: 2 }, y: { a: [Object], b: [Object] } } }
--------------
{ x: 1,
  y: 2,
  z: [ 1, 2, 3, 4, 5, [ 6, 7, [length]: 2 ], [length]: 6 ],
  m: { x: 1, y: 2 },
  n:
   { x: { a: 1, b: 2 },
     y: { a: [ 'a', 'b', [length]: 2 ], b: { aa: 1, bb: 2, cc: 3 } } } }</code>
</pre>
<h4>util.format(format[, ...])</h4>
<p>返回一个格式化字符串，类似c语言中printf函数的格式，第一个参数包含0个或多个占位参数，后面的参数按格式传入字符串中</p>
<b>占位符列表:</b>
<ul>
<li>%s - String</li>
<li>%d - Number(包括integer和float)</li>
<li>%j - JSON</li>
<li>%% - 不是占位的，只是打印‘%’</li>
</ul>
<b>例子:</b>
<pre class='line-numbers language-javascript'>
<code>// utilFormat.js
let util = require('util');
console.log(util.format('hello', 'world'));
console.log(util.format('小明今年%d岁', 18));
console.log(util.format('小明今年%d岁'));
console.log(util.format('这是个json：%j格式的内容', {x: 1, y: 2}));</code>
</pre>
<b>运行js文件:</b>
<pre class='line-numbers language-none'>
<code>$node utilFormat.js
hello world
小明今年18岁
小明今年%d岁
这是个json：{"x":1,"y":2}格式的内容</code>
</pre>
<h3>querystring 模块</h3>
<p>nodejs内置模块，使用require('querystring')引入</p>
<h4>querystring.stringify(obj[, sep][, eq])</h4>
<p>将对象转成字符串，可以设置转换时的分隔符</p>
<b>参数:</b>
<ul>
<li>obj - 要解析的对象</li>
<li>sep - 键值对与键值对之间的分隔符默认为'&'</li>
<li>eq - 键值之间的分隔符，默认为'='</li>
</ul>
<b>例子:</b>
<pre class='line-numbers language-javascript'>
<code>// stringify.js
let qs = require('querystring');
let obj = {
    x: 1,
    y: 2
};
let result1 = qs.stringify(obj);
let result2 = qs.stringify(obj, ', ', ': ');
console.log(typeof result1);
console.log(result1);
console.log(typeof result1);
console.log(result2);</code>
</pre>
<b>运行js文件:</b>
<pre class='line-numbers language-none'>
<code>$node stringify.js
string
x=1&y=2
string
x: 1, y: 2</code>
</pre>
<p>如果值为数组，结果是什么样呢？</p>
<pre class='line-numbers language-javascript'>
<code>let qs = require('querystring');
let obj = {
    x: 1,
    y: [1, 2, 3]
};
qs.stringify(obj);
// x=1&y=1&y=2&y=3</code>
</pre>
<h4>querystring.parse(str[, sep][, eq])</h4>
<p>将字符串转为对象，stringify方法的反向操作</p>
<b>参数:</b>
<ul>
<li>str - 要解析的字符串</li>
<li>sep - 键值对与键值对之间的分隔符默认为'&'</li>
<li>eq - 键值之间的分隔符，默认为'='</li>
</ul>
<b>例子:</b>
<pre class='line-numbers language-javascript'>
<code>// parse.js
let qs = require('querystring');

let str1 = 'x=1&y=2&z=3';
let str2 = 'x=1&y=2&y=3';
let str3 = 'x: 1, y: 2';
let obj1 = qs.parse(str1);
let obj2 = qs.parse(str2);
let obj3 = qs.parse(str3, ', ', ': ');
console.log(typeof obj1);
console.log(obj1);
console.log(obj2);
console.log(obj3);</code>
</pre>
<b>运行js文件:</b>
<pre class='line-numbers language-javascript'>
<code>$node parse.js
object
{ x: '1', y: '2', z: '3' }
{ x: '1', y: [ '2', '3' ] }
{ x: '1', y: '2' }</code>
</pre>
<h3>URL模块</h3>
<p>此模块包含用于解析和分析URL的工具，用require('url')引入</p>
<h4>url.parse(utlStr[, parseQueryString])</h4>
<p>以一个 URL字符串为参数，返回一个解析后的对象。如设置第二个参数为true，则会使用querystring模块解析URL中的查询字符串</p>
<b>例子:</b>
<pre class='line-numbers language-javascript'>
<code>// parse.js
let url = require('url');
let urlstr = 'http://www.baidu.com?username=admin&password=123456';
let urlObj = url.parse(urlstr);
console.log(urlObj);
urlObj = url.parse(urlstr, true);
console.log(urlObj);</code>
</pre>
<b>运行js文件:</b>
<pre class='line-numbers language-none'>
<code>$node parse.js
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?username=admin&password=123456',
  query: 'username=admin&password=123456',
  pathname: '/',
  path: '/?username=admin&password=123456',
  href: 'http://www.baidu.com/?username=admin&password=123456' }
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?username=admin&password=123456',
  query: { username: 'admin', password: '123456' },
  pathname: '/',
  path: '/?username=admin&password=123456',
  href: 'http://www.baidu.com/?username=admin&password=123456' }</code>
</pre>
<h4>url.format(urlObj)</h4>
<p>将一个url对象转成url路径，url.parse()的反向操作</p>
<h4>url.resolve(from, to)</h4>
<p>to链接到from返回url字符串</p>
<b>例子:</b>
<pre class='line-numbers language-javascript'>
<code>url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'</code>
</pre>
<h3>path 路径模块</h3>
<p>包括了一些处理文件路径的功能，可以通过require('path')方法使用</p>
<h4>path.normalize(p)</h4>
<p>用于标准化一个字符型的路径，当发现有多个斜杠（/）时，系统会将他们替换为一个斜杠；如果路径末尾中包含有一个斜杠，那么系统会保留这个斜杠。在Windows中，上述路径中的斜杠（/）要换成反斜杠（\）</p>
<pre class='line-numbers language-javascript'>
<code>path.normalize('/foo/bar//baz///asdf/qsdf/..');
// /foo/bar/baz/asdf</code>
</pre>
<h4>path.join([path1], [path2], [...])</h4>
<p>该方法用于合并方法中的各参数并得到一个标准化合并的路径字符串</p>
<pre class='line-numbers language-javascript'>
<code>path.join('/foo', 'bar', 'baz/sdf', 'dfs');
// /foo/bar/baz/sdf/dfs</code>
</pre>
<h4>path.dirname(p)</h4>
<p>该方法返回一个路径的目录名</p>
<pre class='line-numbers language-javascript'>
<code>path.dirname('/foo/bar/baz/asf/sdf');
// /foo/bar/baz/asf
path.dirname('/foo/bar/baz/asf/sdf.html');
// /foo/bar/baz/asf</code>
</pre>
<h4>path.basename(p)</h4>
<p>该方法返回一个路径中最低一级目录名</p>
<pre class='line-numbers language-javascript'>
<code>path.basename('/foo/bar/baz/asf/sdf');
// sdf
path.basename('/foo/bar/baz/asf/sdf.html');
// sdf</code>
</pre>
<h4>path.parse(path)</h4>
<p>将一个字符串路径解析成path对象</p>
<pre class='line-numbers language-javascript'>
<code>path.parse('/home/user/dir/file.txt');
/*
{ root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file' }
*/</code>
</pre>
<h4>path.format(pathObject)</h4>
<p>将path对象转成path字符串路径，path.parse()的反向操作</p>
<pre class='line-numbers language-javascript'>
<code>path.format({
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
});
// /home/user/dir\file.txt</code>
</pre>
<h4>path.sep</h4>
<p>文件分隔符：windows中为: \ </code> linux中为: / </p>
