(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	var context = canvas.getContext('2d');

	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, 150, 0, 2 * Math.PI, false);
	context.fillStyle = '#fff';
	context.fill();
	context.clip();

	context.font = 'bold 150px Arial';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillStyle = '048';
	context.fillText('CANVAS', canvas.width / 2, canvas.height / 2);
})();
