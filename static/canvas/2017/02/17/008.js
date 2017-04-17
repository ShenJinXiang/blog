(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.beginPath();
	context.moveTo(50, 175);
	context.lineTo(250, 175);
	context.lineTo(250, 100);
	context.lineTo(350, 200);
	context.lineTo(250, 300);
	context.lineTo(250, 225);
	context.lineTo(50, 225);
	context.closePath();

	/*
	context.lineWidth = 10;
	context.strokeStyle = "#058";
	context.stroke();
	*/

	context.fillStyle = 'yellow';
	context.fill();
})();
