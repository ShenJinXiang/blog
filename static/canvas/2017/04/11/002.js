(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	context.rect(100, 100, 400, 400);
	context.clip();

	context.fillStyle = '058';
	context.fillRect(50, 50, 500, 500);
})();
