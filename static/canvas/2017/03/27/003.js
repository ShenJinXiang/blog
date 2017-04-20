(function () {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 300;
	var context = canvas.getContext('2d');

	var linearGrad = context.createLinearGradient(0, 0, canvas.width, 0);
	linearGrad.addColorStop(0, 'red');
	linearGrad.addColorStop(0.5, 'red');
	linearGrad.addColorStop(0.5 + Number.MIN_VALUE, 'blue');
	linearGrad.addColorStop(1, 'blue');
	context.fillStyle = linearGrad;
	context.fillRect(100, 110, 400, 80);
})();
