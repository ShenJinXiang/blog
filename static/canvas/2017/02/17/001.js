(function(){
	let canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	let context = canvas.getContext('2d');

	// 开始绘制
	context.moveTo(100, 100);
	context.lineTo(300, 300);
	context.stroke();
})();

