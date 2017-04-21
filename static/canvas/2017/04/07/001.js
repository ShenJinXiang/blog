(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	context.shadowColor = 'gray';
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowBlur = 5;

	context.fillStyle = '#058';
	context.fillRect(100, 100, 400, 400);
})();
