(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	drawRect({context: context, x: 50, y: 50, width: 300, height: 150, borderWidth : 5, borderColor : '#058', fillColor : 'yellow'});

})();

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
