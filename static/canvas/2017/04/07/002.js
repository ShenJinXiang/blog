(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	context.shadowColor = 'green';
	context.shadowOffsetX = -300;
	context.shadowOffsetY = -300;
	context.shadowBlur = 0;

	context.fillStyle = '#058';
	context.fillRect(300, 300, 300, 300);
})();
