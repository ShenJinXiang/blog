(function () {
	var str = 'www.shenjinxiang.com';

	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 150;
	var context = canvas.getContext('2d');

	// 纯色
	context.fillStyle = '#058';
	context.font = 'bold 40px Arial';
	context.fillText(str, 75, 40);

	// 渐变色
	var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, 'magenta');
	gradient.addColorStop(0.5, 'blue');
	gradient.addColorStop(1, 'red');
	context.fillStyle = gradient;
	context.fillText(str, 75, 125);
})();
