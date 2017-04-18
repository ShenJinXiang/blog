(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 500;
	canvas.height = 500;
	var context = canvas.getContext('2d');

	context.strokeStyle = '#444';
	context.fillStyle = '#444';
	context.beginPath();
	context.lineTo(20, 250);
	context.lineTo(470, 250);
	context.closePath();
	context.stroke();

	context.beginPath();
	context.lineTo(250, 20);
	context.lineTo(250, 470);
	context.closePath();
	context.stroke();

	context.beginPath();
	context.lineTo(460, 245);
	context.lineTo(460, 255);
	context.lineTo(480, 250);
	context.closePath();
	context.fill();

	context.beginPath();
	context.lineTo(255, 460);
	context.lineTo(245, 460);
	context.lineTo(250, 480);
	context.closePath();
	context.fill();

	context.strokeStyle = '#058';
	context.lineWidth = 3;
	context.beginPath();
	context.arc(250, 250, 165, 0, 2 * Math.PI, false);
	context.closePath();
	context.stroke();

	context.fillStyle = '#058';
	context.font = '14px Arial';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText('圆心(x, y)', 290, 235);
	context.fillText('0.5 * Math.PI', 250, 490);
	context.fillText('1.5 * Math.PI', 250, 10);
	context.fillText('Math.PI', 35, 235);
	context.fillText('2 * Math.PI', 460, 235);
	context.fillText('0', 460, 275);
})();
