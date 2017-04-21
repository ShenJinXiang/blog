id: 39
title: Canvas绘制阴影
date: 2017-04-07
category: canvas
tags: javascript, canvas
description: canvas中同样可以绘制阴影，绘制阴影的时候，并不需要像绘制线条和填充一样调用专门的方法去绘制，而是设置阴影相关的一些属性，当调用fill或者stroke方法绘制图形的时候，阴影就可以绘制出来

------
canvas中同样可以绘制阴影，绘制阴影的时候，并不需要像绘制线条和填充一样调用专门的方法去绘制，而是设置阴影相关的一些属性，当调用`fill()`或者`stroke()`方法绘制图形的时候，阴影就可以绘制，阴影相关的属性有：

### shadowColor属性
CanvasRenderingContext2D对象的`shadowColor`属性指定了阴影的颜色，属性值可以是任意的css中可接受的颜色值，甚至可以是有一定透明度的颜色，默认值为`#000000`

### shadowOffsetX属性和shadowOffsetY属性
CanvasRenderingContext2D对象的`shadowOffsetX`和`shadowOffsetY`属性指定了阴影在`x`和`y`轴方向的偏移量，默认为`0`，即没有偏移量，当`shadowOffsetX`的值设置为正数，阴影会向右（x轴正方向）便宜设置的像素。如果为负数，则像相反的方向便宜，对于`shadowOffsetY`属性也是类似的，值为正数表示向下偏移，负数表示向上偏移

### shadowBlur属性
CanvasRenderingContext2D对象的`shadowBlur`属性用于设置阴影的模糊等级，默认为`0`，即不模糊

### 一些例子
```javascript
(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	context.shadowColor = 'gray';
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowBlur = 5;

	context.fillStyle = '#058';
	context.fillRect(100, 100, 400, 400);
})();
```

*效果：*
<iframe src='/static/canvas/2017/04/07/001.html' width='100%' height='640px' frameborder='0' ></iframe>

这里简单绘制了一个矩形图案，在绘制之前设置了阴影的颜色、`x`轴、`y`轴方向的偏移量，以及模糊程度

关于偏移量，可以设置为负值，即相反方向偏移；关于模糊程度，可以设置为`0`即很清晰的图案，看下面的例子

```javascript
(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	context.shadowColor = 'green';
	context.shadowOffsetX = -300;
	context.shadowOffsetY = -300;
	context.shadowBlur = 0;

	context.fillStyle = '#058';
	context.fillRect(300, 300, 300, 300);
})();
```

*效果：*
<iframe src='/static/canvas/2017/04/07/002.html' width='100%' height='640px' frameborder='0' ></iframe>

这个例子中，我们绘制了一个蓝色的矩形图案，设置阴影为相反方向偏移的绿色的图案，模糊等级为`0`

```javascript
(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 240;
	var context = canvas.getContext('2d');

	context.fillStyle = '#058';
	context.font = "bold 50px Arial";
	context.textAlign = 'center';
	context.textBaseline = 'middle';

	context.shadowColor = '#aaa';
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 5;
	context.shadowBlur = 2;
	context.fillText('申锦祥', 300, 80);

	context.strokeStyle = '#058';
	context.lineWidth = 2;
	context.shadowColor = '00f7ff';
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 5;
	context.strokeText('www.shenjinxiang.com', 300, 160);
})();
```

*效果：*
<iframe src='/static/canvas/2017/04/07/003.html' width='100%' height='280px' frameborder='0' ></iframe>

这个例子中先使用`fillText()`方法绘制了一段文字，同时添加阴影。然后会`strokeText()`方法绘制了另外一段文字，同样添加阴影，这里的阴影设置`x`、`y`轴方向的偏移量为`0`，展示出图上的效果
