id: 18
title: Nodejs总结：常用全局对象
date: 2016-11-24
category: nodejs
tags: javascript, nodejs
description: 在浏览器中，宿主对象Window，为顶级作用域对象，定义在Window对象上的属性，即为全局属性，例如：document, location等属性

------
<p>在浏览器中，宿主对象Window，为顶级作用域对象，定义在Window对象上的属性，即为全局属性，例如：document, location等属性</p>
<p>在Node.js中不存在Window对象，但是也存在一个全局对象：global, global是全局对象的一个引用，可以在node命令行中直接输入global来查看</p>
<h3>conlose对象</h3>
<p>console 用于提供控制台标准输出，与浏览器上的console 对象类似，调试代码的时候常用到</p>
<h4>console.log([data], [...])</h4>
<p>向stdout打印信息并另起一行，可以说是最常用的一个方法了</p>
<pre class='line-numbers language-javascript'>
<code>console.log('hello wrold');
console.log('hello', 'world');
console.log('今年是%d年', 2016); // c语言中的printf() 函数
console.log('今年是%d年'); // 看看这个</code>
</pre>
<i>运行结果：</i>
<pre class='line-numbers language-none'>
<code>hello wrold
hello world
今年是2016年
今年是%d年</code>
</pre>
<h4>console.info([data], [...])</h4>
向stdout打印信息，与console.log()差别不大
<pre class='line-numbers language-javascript'>
<code>console.info('hello world');
console.info('hello', 'world');
let name = 'shenjinxiang';
console.info('this is my name: %s', name);</code>
</pre>
<i>运行结果：</i>
<pre class='line-numbers language-none'>
<code>hello world
hello world
this is my name: shenjinxiang</code>
</pre>
<h4>console.error([data], [...])</h4>
<p>与console.log() 一样，不过是输出至stderr 输出错误消息的</p>
<h4>console.warn([data], [...])</h4>
<p>打印警告信息</p>
<h4>console.dir(obj)</h4>
<p>调试的时候经常会用到，对 obj 使用 util.inspect 并将结果字符串输出到 stdout，说白了就是对象obj的字符串形式打印出来</p>
<pre class='line-numbers language-javascript'>
<code>let o = {
	x: 1,
	y: 2,
	z: 'BeiJing',
	m: [1, 2, 3, 4, 5],
	n: {
		x: 11,
		y: 22,
		z: ['a', 'b', 'c']
	}
};
console.dir(o);</code>
</pre>
<i>运行结果：</i>
<pre class='line-numbers language-none'>
<code>{ x: 1,
  y: 2,
  z: 'BeiJing',
  m: [ 1, 2, 3, 4, 5 ],
  n: { x: 11, y: 22, z: [ 'a', 'b', 'c' ] } }</code>
</pre>
<h4>console.time(label)</h4>
<p>并不进行输出，标记一个时间点，开始计时，与console.timeEnd(label)配合使用</p>
<h4>console.timeEnd(label)</h4>
<p>结束计时器，输出结果，与console.time(label) 配合使用</p>
<pre class='line-numbers language-javascript'>
<code>console.time('100000次循环');
var arr = [];
for (let index = 0; index < 100000; index++) {
	arr.push(index);
}
console.timeEnd('100000次循环');</code>
</pre>
<i>运行结果：</i>
<pre class='line-numbers language-none'>
<code>100000次循环: 2.038ms</code>
</pre>
<h3>process对象</h3>
<p>进程对象process是一个全局对象，可以在任何地方访问到它，这个对象有很多属性和方法，这里只说几个简单的、目前可能会用到的</p>
<h4>process.argv</h4>
<p>一个包含命令行参数的数组。第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数</p>
<pre class='line-numbers language-javascript'>
<code>// argvTest.js
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});</code>
</pre>
<i>执行并查看运行结果：</i>
<pre class='line-numbers language-none'>
<code>node argvTest.js hello shenjinxiang node.js
0:  /usr/local/Cellar/node/6.2.2/bin/node
1:  /Users/shenjinxiang/Documents/nodejs/nodejs总结/argvTest.js
2:  hello
3:  shenjinxiang
4:  node.js</code>
</pre>
<h4>process.cwd()</h4>
<p>返回进程当前的工作目录</p>
<pre class='line-numbers language-javascript'>
<code>console.log('当前目录：', process.cwd());
// 当前目录： /Users/shenjinxiang/Documents/nodejs/nodejs总结</code>
</pre>
<h4>process.version</h4>
<p>一个编译属性，包含 NODE_VERSION</p>
<pre class='line-numbers language-javascript'>
<code>console.log('Version: ' + process.version);
Version: v6.2.2</code>
</pre>
<h4>process.versions</h4>
<p>一个属性，包含了 node 的版本和依赖</p>
<pre class='line-numbers language-javascript'>
<code>console.log(process.versions);
/*
{ http_parser: '2.7.0',
  node: '6.2.2',
  v8: '5.0.71.52',
  uv: '1.9.1',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  icu: '57.1',
  modules: '48',
  openssl: '1.0.2h' }
*/</code>
</pre>
<h3>__filename</h3>
<p>字符串类型，当前所执行代码文件的文件路径</p>
<pre class='line-numbers language-javascript'>
<code>// filenameTest.js
console.log(__filename);
// /Users/shenjinxiang/Documents/nodejs/nodejs总结/filenameTest.js</code>
</pre>
<h3>__dirname</h3>
<p>字符串类型，当前执行脚本所在目录的目录名</p>
<pre class='line-numbers language-javascript'>
<code>// dirnameTest.js
console.log(__dirname);
// /Users/shenjinxiang/Documents/nodejs/nodejs总结</code>
</pre>
<h3>定时器函数</h3>
<h4>setTimeout(cb, ms)</h4>
<p>与浏览器上Window对象的setTimeout的方法一样的效果，在至少ms毫秒后调用回调cb。实际延迟取决于外部因素，如操作系统定时器粒度及系统负载，返回一个代表该定时器的句柄值</p>
<h4>clearTimeout(t)</h4>
<p>停止一个之前通过setTimeout()创建的定时器。回调不会再被执行</p>
<h4>setInterval(cb, ms)</h4>
<p>每隔ms毫秒重复调用回调cb。注意，取决于外部因素，如操作系统定时器粒度及系统负载，实际间隔可能会改变。它不会少于ms但可能比ms长，返回一个代表该定时器的句柄值</p>
<h4>clearInterval(t)</h4>
<p>停止一个之前通过setInterval()创建的定时器。回调不会再被执行</p>
