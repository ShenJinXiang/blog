(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	// 辅助线
	context.strokeStyle = '#aaa';
	context.moveTo(0, canvas.height / 2);
	context.lineTo(canvas.width, canvas.height / 2);
	context.stroke();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();

	// 绘制图案
	for (let i = 0; i < 4; i++) {
		context.save();
		context.fillStyle = 'red';
		context.translate(200, 200);
		if (i == 0) {
			context.scale(5, 10);
		} else if (i == 1) {
			context.scale(-5, 10);
		} else if (i == 2) {
			context.scale(5, -10);
		} else if (i == 3) {
			context.scale(-5, -10);
		}
		context.beginPath();
		context.lineTo(10, 10);
		context.lineTo(20, 10);
		context.lineTo(10, 20);
		context.closePath();
		context.fill();
		context.restore();
	}
})();
