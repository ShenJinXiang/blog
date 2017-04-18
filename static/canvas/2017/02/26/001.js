(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.lineTo(50, 180);
	context.lineTo(350, 180);
	context.strokeStyle = 'red';
	context.stroke();

	context.beginPath();
	context.lineTo(50, 220);
	context.lineTo(350, 220);
	context.strokeStyle = 'red';
	context.stroke();

	context.beginPath();
	context.lineTo(50, 200);
	context.lineTo(350, 200);
	context.lineWidth = 40;
	context.strokeStyle = '#ddd';
	context.stroke();
})();
