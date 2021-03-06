id: 32
title: Canvas绘制直线
date: 2017-02-17
category: canvas
tags: javascript, canvas
description: Canvas绘图，先从最简单的开始，绘制直线，其实是直线段

------
Canvas绘图，先从最简单的开始，绘制直线，其实是直线段。首先，编写html:

### 基本模板
#### html部分
```html
<!doctype html>
<html>
<head>
	<meta charset='utf-8'>
	<style>
		canvas{display:block; border: 1px solid #ccc;margin: 0px auto;}
	</style>
	<title>canvas</title>
</head>
<body>
	<canvas id='mycanvas'></canvas>
<script src='外部js路径'></script>
</body>
</html>
```
body部分添加了canvas标签，设置canvas标签的id为`mycanvas`，引入外部的js文件；head部分设置canvas为块级元素、居中并设置边框为`1`个像素宽

#### js部分
```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
})();
```
在这里，设置canvas的宽高都为`400`像素，并获取canvas的CanvasRenderingContext2D对象context，下面我们所有的代码都是操作context来实现

### 简单线段
先绘制一条简单的线段，代码：
```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(100, 100);
	context.lineTo(300, 300);
	context.stroke();
})();
```
这样就绘制了一条从`(100, 100)`到`(300, 300)`的一条线段，效果如下：

<iframe src='/static/canvas/2017/02/17/001.html' width='100%' height='450px' frameborder='0' ></iframe>

需要注意的是，真正实现绘制的代码是调用`stroke()`这个方法，想象一张画布，我们计划从`(100m 100)`开始画一条线段到`(300, 300)`终止，最后通过`stroke()`方法绘制到画布上。canvas是基于状态来绘图的，`moveTo()`和`lineTo()`设置了线条状态，`stroke()`实现绘制图形

我们可以设定线段的宽度和颜色：
```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(100, 100);
	context.lineTo(300, 300);
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
```
*绘制效果：*
<iframe src='/static/canvas/2017/02/17/002.html' width='100%' height='450px' frameborder='0' ></iframe>

通过`lineWidth`属性设置线条宽度为10个像素，`strokeStyle`属性设置背景颜色为“#058”，同样可以看到canvas是基于状态画图，我们是通过context来设置线条宽度、颜色属性，而不是通过一个线条对象来设置的

### 绘制连续线段
既然可以绘制一条线段，同样的，可以绘制连续的线段，看下面的例子：
```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
```
效果如下：

<iframe src='/static/canvas/2017/02/17/003.html' width='100%' height='450px' frameborder='0' ></iframe>

在这个例子中，我们设置起始点坐标为`(50, 175)`，依次调用`lineTo()`方法，设置线条的宽度和颜色属性，最后调用`stroke()`完成绘制

如果要画多段连续的线段怎么做呢？很简单，利用`moveTo()`方法，看下面的例子：
```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(50, 100);
	context.lineTo(150, 200);
	context.lineTo(50, 300);

	context.moveTo(150, 100);
	context.lineTo(250, 200);
	context.lineTo(150, 300);

	context.moveTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);

	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
```
效果如下：

<iframe src='/static/canvas/2017/02/17/004.html' width='100%' height='450px' frameborder='0' ></iframe>

这个例子中，分别调用了三次`moveTo()`方法，绘制了三条不相连的折线段，最后设置线条宽度和颜色，最后调用`stroke()`方法完成绘制

### context.beginPath()方法
上面的例子中，我们绘制了三条同样颜色的折线段，如果要设置不同的颜色呢？我们首先想到的方法是这样的：
```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(50, 100);
	context.lineTo(150, 200);
	context.lineTo(50, 300);
	context.lineWidth = 10;
	context.strokeStyle = "red";
	context.stroke();

	context.moveTo(150, 100);
	context.lineTo(250, 200);
	context.lineTo(150, 300);
	context.lineWidth = 10;
	context.strokeStyle = "green";
	context.stroke();

	context.moveTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineWidth = 10;
	context.strokeStyle = "blue";
	context.stroke();
})();
```

每次设置好线条路径以后设置线条的颜色，同时调用`stroke()`方法完成绘制，那么实际效果是什么样子呢？ 我们看看实际效果：

<iframe src='/static/canvas/2017/02/17/005.html' width='100%' height='450px' frameborder='0' ></iframe>

三条折线段都是蓝色的，并没有达到预期的效果，为什么会这样呢？这是因为canvas是基于状态绘图的，当第一次调用`stroke()`绘制的时候，线条颜色确实是红色的，绘制第二条折线段的时候设置线条颜色为绿色，将覆盖掉原来的状态，第二次调用`stroke()`方法，同样也绘制了第一条的折线段，将第一次绘制的红色的折线段覆盖掉了，第三次同样的效果，将前两次的状态都覆盖掉了，所以最终显示的是三条蓝色的折线段。那么我们该这样实现不同的颜色呢？需要用到`beginPath()`方法

```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.lineWidth = 10;

	context.beginPath();
	context.moveTo(50, 100);
	context.lineTo(150, 200);
	context.lineTo(50, 300);
	context.strokeStyle = "red";
	context.stroke();

	context.beginPath();
	context.moveTo(150, 100);
	context.lineTo(250, 200);
	context.lineTo(150, 300);
	context.strokeStyle = "green";
	context.stroke();

	context.beginPath();
	context.moveTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.strokeStyle = "blue";
	context.stroke();
})();
```

在开始的时候，设置线条宽度为10个像素，下面每次开始绘制一条折线段的时候，调用一次`beginPath()`方法，效果如下：

<iframe src='/static/canvas/2017/02/17/006.html' width='100%' height='450px' frameborder='0' ></iframe>

实现效果了，需要注意的是对于`lineWidth`属性，只是在开始设置为`10`像素，绘制的3条折线段都是`10`像素宽，我们可以知道，对于`beginPath()`如果一个状态没有被重新设置，它将一只用之前设置的属性值，所以在实际应用时，一定要清楚当前路径所使用的状态。另外，上面例子中的`moveTo()`方法可以用`lineTo()`方法替换，效果是一样的，因为`beginPath()`方法，同时声明开始一段新的路径绘制。


### context.closePath()方法
既然有开始一条路径的方法，当然也有关闭路径的方法了，那么`closePath()`方法有什么用呢？就拿上面绘制的那个箭头的图案为例，如果要封闭图案改怎么来呢？简单，最后在调用次`lineTo()`绘制到起始位置坐标，代码如下：

```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.lineTo(50, 175);
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
```

效果如下：

<iframe src='/static/canvas/2017/02/17/007.html' width='100%' height='450px' frameborder='0' ></iframe>

也实现了封闭，但还是有问题的，左上角有个小缺口，这是因为线条宽度为10个像素，如果为1像素宽是没有问题的，如果宽度很大，这个缺口也会很大，这时候就需要用到`closePath()`方法了。`closePath()`方法会在当前点与当前路径的第一个点之间连线，封闭路径

```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.closePath();
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
})();
```
这样，实现了一个封闭图形的绘制，最后一个`lineTo()`省略了，因为`closePath()`会自动绘制最后一条线段。实际开发的时候`beginPath()`和`closePath()`是成对出现的。当然需要灵活应用

### 填充图案
上面的所有例子，我们是通过`stroke()`绘制路径的线条的，当然也可以填充设置的路径，也可以设置填充颜色，继续将上面的代码稍微修改：
```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.closePath();

	/*
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
	*/

	context.fillStyle = 'yellow';
	context.fill();
})();
```

效果如下：

<iframe src='/static/canvas/2017/02/17/008.html' width='100%' height='450px' frameborder='0' ></iframe>

在这里通过设置`fillStyle`属性，设置填充颜色为黄色，调用`fill()`方法填充图案，当然可以同时调用`stroke()`和`fill()`方法，同时绘制边框和填充图案，只需要把上面代码中国年注释掉的部分打开即可：
```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.closePath();

	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();

	context.fillStyle = 'yellow';
	context.fill();
})();
```

效果如下：

<iframe src='/static/canvas/2017/02/17/009.html' width='100%' height='450px' frameborder='0' ></iframe>

可以发现，边框的宽度比原来的窄了很多，这是因为`fill()`填充的时候，将线条一半宽度`5`像素覆盖掉了，如果要显示`10`像素边框，调换`stroke()`和`fill()`位置即可，即先填充，然后绘制边框

```javascript
(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.closePath();

	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.fillStyle = 'yellow';

	context.fill();
	context.stroke();
})();
```

效果如下：

<iframe src='/static/canvas/2017/02/17/010.html' width='100%' height='450px' frameborder='0' ></iframe>

至此，我们介绍了，绘制线条的一些基本用法，下面是绘制矩形的方法：
```javascript
function drawRect({context, x = 0, y = 0, width = 10, height = 10, borderWidth = 1, borderColor = '#333', fillColor = '#eee'}) {
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x + width, y);
	context.lineTo(x + width, y + height);
	context.lineTo(x, y + height);
	context.closePath();

	context.lineWidth = borderWidth;
	context.strokeStyle = borderColor;
	context.fillStyle = fillColor;

	context.fill();
	context.stroke();
}
```

在这个方法中除了context，其它所有参数都设置了默认值，测试代码：
```javascript
(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	drawRect({
		context: context,
		x: 50,
		y: 50,
		width: 300,
		height: 150,
		borderWidth : 5,
		borderColor : '#058',
		fillColor : 'yellow'
	});

})();
```

效果如下：

<iframe src='/static/canvas/2017/02/17/011.html' width='100%' height='450px' frameborder='0' ></iframe>

实际上，要绘制矩形，有CanvasRenderingContext2D有两个方法`strokeRect(x, y, width, height)`和`fillRect(x, y, width, height)`可以实现绘制矩形边框和填充矩形图案
