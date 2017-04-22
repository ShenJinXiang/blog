(function() {
	let canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 600;
	let context = canvas.getContext('2d');

	context.fillStyle = '#058';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.clearRect(100, 100, 200, 200);
})();
