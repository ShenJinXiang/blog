(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 200;
	var context = canvas.getContext('2d');

	context.lineWidth = 3;
	context.fillStyle = '#058';

	context.beginPath();
	context.arc(50, 50, 35, 0, 0.5 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(150, 50, 35, 0, 1 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(250, 50, 35, 0, 1.5 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(350, 50, 35, 0, 2 * Math.PI, true);
	context.stroke();

	context.beginPath();
	context.arc(50, 150, 35, 0, 0.5 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(150, 150, 35, 0, 1 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(250, 150, 35, 0, 1.5 * Math.PI, true);
	context.fill();

	context.beginPath();
	context.arc(350, 150, 35, 0, 2 * Math.PI, true);
	context.fill();
})();
