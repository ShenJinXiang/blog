(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 100;
	var context = canvas.getContext('2d');

	context.lineWidth = 1;
	context.strokeStyle = '#eee';
	context.moveTo(0, canvas.height / 2);
	context.lineTo(canvas.width, canvas.height / 2);
	context.stroke();

	var bls = ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom'];

	context.fillStyle = '#084';
	context.font = 'bold 20px Arial';

	context.textBaseline = 'alphabetic';
	context.fillText('alphabetic', 10, canvas.height / 2);

	context.textBaseline = 'top';
	context.fillText('top', 115, canvas.height / 2);

	context.textBaseline = 'hanging';
	context.fillText('hanging', 160, canvas.height / 2);

	context.textBaseline = 'middle';
	context.fillText('middle', 260, canvas.height / 2);

	context.textBaseline = 'ideographic';
	context.fillText('ideographic', 360, canvas.height / 2);

	context.textBaseline = 'bottom';
	context.fillText('bottom', 500, canvas.height / 2);

})();
