(function() {
	var str = 'shenjinxiang';

	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 525;
	var context = canvas.getContext('2d');

	context.lineWidth = 1;
	context.strokeStyle = '#eee';
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();

	var aligns = ['start', 'end', 'center', 'left', 'right'];

	context.fillStyle = '#084';
	context.font = 'bold 38px Arial';
	for (var i = 0; i < aligns.length; i++) {
		context.textAlign = aligns[i];
		context.fillText(str, canvas.width / 2, (i + 1) * 90);

		context.beginPath();
		context.lineTo(0, (i + 1) * 90);
		context.lineTo(canvas.width, (i + 1) * 90);
		context.closePath();
		context.stroke();
	}

})();
