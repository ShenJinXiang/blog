(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext('2d');

	// 开始绘制
	drawRect(context, 50, 50, 300, 150, 5, '#058', 'yellow');

})();

function drawRect(context, x, y, width, height, borderWidth, borderColor, fillColor) {
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
