(function(){
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext('2d');

	// 开始绘制
	
	// 设置通用样式
	context.lineWidth = 40;
	context.strokeStyle = '#058';
	
	// lineCap属性值为 butt
	context.beginPath();
	context.lineTo(50, 100);
	context.lineTo(350, 100);
	context.lineCap = 'butt';
	context.stroke();

	// lineCap属性值为 round
	context.beginPath();
	context.lineTo(50, 200);
	context.lineTo(350, 200);
	context.lineCap = 'round';
	context.stroke();

	// lineCap属性值为 square
	context.beginPath();
	context.lineTo(50, 300);
	context.lineTo(350, 300);
	context.lineCap = 'square';
	context.stroke();

	// 绘制辅助线，便于观察
	
	context.lineWidth = 1;
	context.strokeStyle = '#aaa';
	context.lineCap = 'butt';

	context.beginPath();
	context.lineTo(30, 0);
	context.lineTo(30, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.lineTo(50, 0);
	context.lineTo(50, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.lineTo(350, 0);
	context.lineTo(350, context.canvas.width);
	context.stroke();

	context.beginPath();
	context.lineTo(370, 0);
	context.lineTo(370, context.canvas.width);
	context.stroke();
})();
