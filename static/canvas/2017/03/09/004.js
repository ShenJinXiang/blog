(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext('2d');

	context.fillStyle = "#058";
	context.beginPath();
	context.moveTo(100, 100);
	context.lineTo(300, 100);
	context.lineTo(300, 300);
	context.lineTo(100, 300);
	context.closePath();
	context.moveTo(125, 125);
	context.lineTo(125, 275);
	context.lineTo(275, 275);
	context.lineTo(275, 125);
	context.closePath();
	context.fill();
})();
