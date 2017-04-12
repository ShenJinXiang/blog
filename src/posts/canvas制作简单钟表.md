id: 12
title: canvas制作简单钟表
date: 2016-07-12
category: demo
tags: demo, canvas, javascript
description: 之前用html+css+JavaScript实现了一个简单钟表，但还是有一些问题，主要是一些css属性不同浏览器支持效果不一样，所以尝试用canvas实现了一个简单的钟表

------
<p>之前用html+css+JavaScript实现了一个简单钟表，但还是有一些问题，主要是一些css属性不同浏览器支持效果不一样，所以尝试用canvas实现了一个简单的钟表，效果在下方，当然了，采用canvas同样会有一些浏览器不支持。。。 这里只讨论canvas的实现方式。</p>
<iframe src='/static/canvas/2016/07/12/clock/clock.html' frameborder='0' height='450px' width='100%' scrolling='yes'></iframe>
<h3>html部分</h3>
<p>html部分很简单，写入canvas标签，其id设置为“canvas”，用css设置成居中显示，代码如下：</p>
<pre class='line-numbers language-html'>
<code>&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;meta charset='utf-8'&gt;
	&lt;style&gt;
	canvas{display:block;margin:5px auto;}
	&lt;/style&gt;
	&lt;title&gt;clock&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;canvas id='canvas'&gt;您的浏览器不支持canvas标签&lt;/canvas&gt;
&lt;script type='text/javascript' src="外部JavaScript文件路径"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<p>备注：需要通过script标签的src属性引入外部JavaScript文件</p>
<h3>JavaScript部分</h3>
<p>可以通过js获取Canvas对象，设置画布的宽高，不过绘图工作是通过操作CanvasRenderingContext2D对象来操作的，获取此对象的方法：</p>
<pre class='line-numbers language-javascript'>
<code>var canvas = document.getElementById('canvas');	// Canvas对象
canvas.width = 450;		// 宽
canvas.height = 450;	// 高
var context = canvas.getContext('2d'); // 获取绘图上下文环境</code>
</pre>
<p>获取到绘图上下文context以后即可绘制钟表了，整体思路是这样的：定义一个全局变量记录当前系统时间信息，用setInterval方法重复执行，获取时间信息，并绘制图像，代码如下：</p>
<pre class='line-numbers language-javascript'>
<code>var currentDateObj; // 记录当前时间信息
setInterval(function(){
	update(); // 修改currentDateObj的内容
	draw(); // 根据currentDateObj的内容绘制图像
}, 500);</code>
</pre>
<p>本文实现重点在于绘制图像，关于update方法的实现，可以直接查看后边的整体js代码，draw方法中，主要涉及到的一些内容有：线段和圆的绘制、canvas文字渲染、canvas阴影实现、canvas图形变换等内容</p>
<h4>canvas绘制线段、圆</h4>
<p>绘制线段很简单，只需调用moveTo、lineTo方法设置线段路径，调用stroke方法完成绘制</p>
<pre class='line-numbers language-javascript'>
<code>context.moveTo(20, 70);
context.lineTo(140, 70);
context.lineTo(140, 40);
context.lineTo(180, 80);
context.lineTo(140, 120);
context.lineTo(140, 90);
context.lineTo(20, 90);
context.lineWidth = 2; // 设置线段宽度
context.strokeStyle = "#058"; // 设置颜色
context.stroke();	// 绘制到画布上</code>
</pre>
<p>运行结果：</p>
<iframe src='/static/canvas/2016/07/12/clock/test1.html' frameborder='0' height='200px' width='100%' scrolling='yes'></iframe>
<p>绘制圆需要调用arc方法，然后调用stroke完成绘制，arc有5个参数，分别表示圆弧圆心的x坐标、y坐标、圆弧半径、起始角、结束角，最后一个参数是一个布尔值，false表示顺时针，true表示逆时针，下面是一些示例</p>
<pre class='line-numbers language-javascript'>
<code>for(var i = 0; i &lt; 2; i++) {
	for(var j = 0; j &lt; 4; j++){
		var b = (i == 0) ? false : true;
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = '#058';
		context.arc(150 * j + 75, 150 * i + 75, 45, 0, (j + 1) * Math.PI / 2, b);
		context.stroke();
	}
}</code>
</pre>
<p>运行结果：</p>
<iframe src='/static/canvas/2016/07/12/clock/test2.html' frameborder='0' height='420px' width='100%' scrolling='yes'></iframe>
<p>通过moveTo、lineTo或者arc方法设置好图形路径以后，调用stroke方法完成图形绘制，如果需要绘制一个区域，需要调用fill方法，如上例中，可以将stroke改成fill代码如下：</p>
<pre class='line-numbers language-javascript'>
<code>for(var i = 0; i &lt; 2; i++) {
	for(var j = 0; j &lt; 4; j++){
		var b = (i == 0) ? false : true;
		context.beginPath();
		context.fillStyle = '#058';
		context.arc(150 * j + 75, 150 * i + 75, 45, 0, (j + 1) * Math.PI / 2, b);
		context.fill();
	}
}</code>
</pre>
<p>运行结果如下：</p>
<iframe src='/static/canvas/2016/07/12/clock/test3.html' frameborder='0' height='420px' width='100%' scrolling='yes'></iframe>
<h4>canvas文字渲染</h4>
<p>在canvas画布上写段文字很简单，基本分两步：1.通过设置context的font属性设置文本的样式；2. 调用fillText或strokeText方法渲染文字</p>
<pre class='line-numbers language-javascript'>
<code>context.font = "bold 40px Arial";
context.fillStyle = '#058';
context.fillText("Canvas制作简单钟表", 50, 50);
context.strokeStyle = '#058';
context.strokeText("Canvas制作简单钟表", 50, 150);</code>
</pre>
<p>运行结果如下：</p>
<iframe src='/static/canvas/2016/07/12/clock/test4.html' frameborder='0' height='220px' width='100%' scrolling='yes'></iframe>
<p>可以设置textAlign和textBaseline属性分别设置文本水平和垂直方向的对齐方式</p>
<h4>canvas阴影效果</h4>
canvas设置阴影主要涉及到的属性有：shadowColor设置阴影颜色，shadowOffsetX和shadowOffsetY分别设置阴影在x和y方向上的偏移量，shadowBlur设置阴影的模糊程度
<pre class='line-numbers language-javascript'>
<code>context.shadowColor = "#444";	// 阴影颜色
context.shadowOffsetX = 10;	// 阴影在x方向偏移量 负数为反方向
context.shadowOffsetY = 10; // 阴影在y方向偏移量 负数为反方向
context.shadowBlur = 10;	// 阴影模糊程度
context.fillStyle = "#058";
context.fillRect(100, 50, 300, 100);</code>
</pre>
<p>运行结果如下：</p>
<iframe src='/static/canvas/2016/07/12/clock/test5.html' frameborder='0' height='220px' width='100%' scrolling='yes'></iframe>
<h4>canvas图形变换</h4>
<p>canvas中最基本的图形变换涉及到的方法是：位移 translate(x, y)，旋转 rotate(deg)，缩放 scale(sx, sy),我们知道默认的坐标原点(0, 0)在canvas的左上角，但是对于我们的钟表来说，如果能将坐标原点移动到表盘的圆心位置，处理起来将很方便，rotate将图像旋转制定的角度，旋转中心点即坐标原点，scale将图像按制定的比例在x和y方向上进行缩放。需要注意的是，cavnas是基于状态的，如果通过调用translate(100, 100)方法，将坐标原点移动到(100, 100)的位置以后，如果再次调用，那么坐标原点将在当前基础上累加，所以在实际调用时，需要掉用save方法保存当前状态，完成绘制以后调用restore方法还原</p>
<p>本例中多次应用translate方法，设置表盘圆心为坐标原点，用rotate方法旋转图像，如刻度的绘制，只是绘制水平方向的一条线段，通过旋转不同角度来达到效果</p>
<h4>clearRect方法</h4>
<p>clearRect方法用于清空一个矩形空间站的图像，语法为：context.clearRect(x, y, width, height); 第一个参数x 表示要清除的矩形左上角的x坐标，第二个参数y 表示要清除的矩形左上角的y坐标，width参数表示要清除的矩形的宽度，height参数表示要清除的矩形的高度。</p>
<p>在本例中，draw方法的第一步就是调用此方法，清空整个canvas画布的内容，然后才根据currentDateObj中的内容绘制图像。</p>
<h4>JavaScript部分的完整代码</h4>
<p>准备工作基本做完了，下面是本例中完整的JavaScript代码：</p>
<pre class='line-numbers language-javascript'>
<code>(function(){
	var config = {
		canvas : {
			width : 420, // 设置canvas的宽
			height : 420, // 设置canvas的高	
		},
		clock : {
			radius : 200, // 设置表盘半径
			borderWidth : 10, // 表盘边框宽度
			origin : {
				radius : 8, // 中心点 半径
				color : '#333' // 中心点 颜色
			},
			hand : {
				hour : {width : 5, length : 80}, // 时针宽度和长度
				minute : {width : 2, length : 110}, // 分针的宽度和长度
				second : {length : 160} // 秒针长度
			}
		}
	};

	var canvas = document.getElementById('canvas');
	canvas.width = config.canvas.width;
	canvas.height = config.canvas.height;
	var context = canvas.getContext('2d');

	var currentDateObj;	// 保存当前时间

	setInterval(function(){
		update();
		draw();
	}, 500);

	function update(){
		currentDateObj = getDateObj();

		function getDateObj() {
			var week = ['星期日', '星期一', '星期二', '星期三',
					'星期四', '星期五', '星期六'];
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var date = d.getDate();
			var day = d.getDay();
			var hour = d.getHours();
			var minute = d.getMinutes();
			var second = d.getSeconds();
			month = (month &lt; 9) ? '0' + month : '' + month;
			date = (date &lt; 9) ? '0' + date : '' + date;
			hour = (hour &lt; 9) ? '0' + hour : '' + hour;
			minute = (minute &lt; 9) ? '0' + minute : '' + minute;
			second = (second &lt; 9) ? '0' + second : '' + second;
			var time = [hour, minute, second];
			var str = year + '-' + month + '-' + date + ' ' + week[day];
			return {
				dateStr: str,
				dateTime: time
			}
		}
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawBorder();
		drawScale();
		drawNumbers();
		drawTime();
		drawHand();
		drawOrigin();
		
		/**
		 * 绘制表盘边框
		 */
		function drawBorder() {
			context.save();
			context.beginPath();
			context.arc(canvas.width / 2, canvas.height / 2, config.clock.radius,
					0, 2 * Math.PI, false);
			context.arc(canvas.width / 2, canvas.height / 2,
					config.clock.radius - config.clock.borderWidth, 
					0, 2 * Math.PI, true);
			context.fillStyle = "#333";
			context.shadowColor = "#444";
			context.shadowBlur = 10;
			context.closePath();
			context.fill();
			context.restore();
		}

		/**
		 * 绘制中心圆点
		 */
		function drawOrigin() {
			context.save();
			context.beginPath();
			context.arc(canvas.width / 2, canvas.height / 2,
					config.clock.origin.radius, 0, 2 * Math.PI, false);
			context.fillStyle = config.clock.origin.color;
			context.shadowColor = "#444";
			context.shadowBlur = 3;
			context.closePath();
			context.fill();
			context.restore();
		}

		/**
		 * 绘制表盘刻度
		 */
		function drawScale() {
			for(var i = 0; i &lt; 60; i++) {
				var obj = {
					sx : config.clock.radius - 15 - config.clock.borderWidth,
					sy : 0,
					ex : config.clock.radius - config.clock.borderWidth - 5,
					ey : 0,
					color : "#333",
					width : 1
				};
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate(i * 6 * Math.PI / 180);
				context.beginPath();
				if(i % 5 == 0) {
					obj.width = 3;
					obj.color = "#000";
				}
				if(i % 15 == 0) {
					obj.sx = config.clock.radius - 20 - config.clock.borderWidth;
				}
				context.moveTo(obj.sx, obj.sy);
				context.lineTo(obj.ex, obj.ey);
				context.strokeStyle = obj.color;
				context.lineWidth = obj.width;
				context.closePath();
				context.stroke();
				context.restore();
			}
		}

		/**
		 * 获取1-12数字
		 */
		function drawNumbers() {
			var radius = config.clock.radius - config.clock.borderWidth - 40;
			for(var i = 0; i &lt; 12; i++) {
				context.save();
				context.beginPath();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.font = "normal 28px Arial";
				if((i + 1) % 3 == 0) {
					context.font = "normal 36px Arial";
				}
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText(i + 1, 
						-radius * Math.cos((-i * 30 - 120) * Math.PI  / 180), 
						radius * Math.sin((-i * 30 - 120) * Math.PI / 180));
				context.closePath();
				context.restore();
			}
		}

		/**
		 * 绘制下方的文字
		 */
		function drawTime() {
			context.save();
			context.translate(canvas.width / 2, canvas.height / 2);
			drawDateStr();
			drawTimeBox();
			drawTime();
			context.restore();

			/**
			 * 绘制 年月日星期信息
			 */
			function drawDateStr() {
				context.beginPath();
				context.font = "bold 14px Arial";
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.shadowColor = '#ccc';
				context.shadowBlur = 2;
				context.closePath();
				context.fillText(currentDateObj.dateStr, 0, 40);
			}

			/**
			 * 绘制显示时分秒的背景盒子
			 */
			function drawTimeBox() {
				context.beginPath();
				context.fillStyle = "#555";
				context.shadowColor = "#444";
				context.shadowBlur = 3;
				context.closePath();
				context.fillRect(-47, 60, 30, 30);
				context.fillRect(-15, 60, 30, 30);
				context.fillRect(17, 60, 30, 30);
			}

			/**
			 * 绘制时分秒数字
			 */
			function drawTime() {
				context.beginPath();
				context.font = "normal 14px Arial";
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = "#fff";
				context.closePath();
				context.fillText(currentDateObj.dateTime[0], -32, 75);
				context.fillText(currentDateObj.dateTime[1], 0, 75);
				context.fillText(currentDateObj.dateTime[2], 32, 75);
			}

		}

		/**
		 * 绘制时分秒针
		 */
		function drawHand() {

			var _hour = currentDateObj.dateTime[0] % 12;
			var _minute = currentDateObj.dateTime[1];
			var _second = currentDateObj.dateTime[2];
			drawHourHand();
			drawMinuteHand();
			drawSecondHand();

			// 时针
			function drawHourHand() {
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate(((_hour + _minute / 60) - 3) * 30 * Math.PI / 180);
				context.beginPath();
				context.moveTo(-12, 0);
				context.lineTo(config.clock.hand.hour.length, 0);
				context.lineWidth = config.clock.hand.hour.width;
				context.strokeStyle = config.clock.origin.color;
				context.lineCap = "round";
				context.shadowColor = "#999";
				context.shadowBlur = 5;
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.stroke();
				context.stroke();
				context.closePath();
				context.restore();
			}

			// 分针
			function drawMinuteHand() {
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate((_minute - 15) * 6 * Math.PI / 180);
				context.beginPath();
				context.moveTo(-18, 0);
				context.lineTo(config.clock.hand.minute.length, 0);
				context.lineWidth = config.clock.hand.minute.width;
				context.strokeStyle = config.clock.origin.color;
				context.lineCap = "round";
				context.shadowColor = "#999";
				context.shadowBlur = 5;
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.stroke();
				context.closePath();
				context.restore();
			}

			// 秒针
			function drawSecondHand() {
				context.save();
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate((_second - 15) * 6 * Math.PI / 180);
				context.beginPath();
				context.moveTo(-35, 1.5);
				context.lineTo(0, 1.5);
				context.lineTo(config.clock.hand.second.length, 0.5);
				context.lineTo(config.clock.hand.second.length, -0.5);
				context.lineTo(0, -1.5);
				context.lineTo(-35, -1.5);
				context.closePath();
				context.fillStyle = "#f60";
				context.shadowColor = "#999";
				context.shadowBlur = 5;
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.fill();
				context.restore();
			}
		}
	}
}());</code>
</pre>
