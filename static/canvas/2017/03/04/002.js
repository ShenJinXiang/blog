(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext('2d');

	// 开始绘制
	context.fillStyle = 'blue';
	context.translate(50, 50);
	context.fillRect(0, 0, 200, 200);

	context.fillStyle = 'red';
	context.translate(150, 150);
	context.fillRect(0, 0, 200, 200);
})();
