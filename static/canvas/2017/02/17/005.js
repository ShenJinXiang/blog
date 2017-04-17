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
