(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.lineWidth = 2;

	context.save();
	context.scale(1, 1);
	context.strokeRect(25, 25, 100, 100);
	context.restore();

	context.save();
	context.scale(2, 2);
	context.strokeRect(25, 25, 100, 100);
	context.restore();

	context.save();
	context.scale(3, 3);
	context.strokeRect(25, 25, 100, 100);
	context.restore();
})();
