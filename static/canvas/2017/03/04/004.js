(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.save();
	context.fillStyle = '#058';
	context.translate(200, 200);
	context.rotate(Math.PI / 6);
	context.fillRect(-100, -100, 200, 200);
	context.restore();
})();
