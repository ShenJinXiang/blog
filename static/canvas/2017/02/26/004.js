(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.lineWidth = 5;
	context.strokeStyle = '#058';

	context.beginPath();
	context.lineTo(25, 350);
	context.lineTo(75, 50);
	context.lineTo(125, 350);
	context.lineJoin = 'miter';
	context.stroke();

	context.beginPath();
	context.lineTo(150, 350);
	context.lineTo(200, 50);
	context.lineTo(250, 350);
	context.lineJoin = 'round';
	context.stroke();

	context.beginPath();
	context.lineTo(275, 350);
	context.lineTo(325, 50);
	context.lineTo(375, 350);
	context.lineJoin = 'bevel';
	context.stroke();
})();
