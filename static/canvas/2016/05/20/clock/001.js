(function() {
	var canvas = document.getElementById('canvas');
	canvas.width = 300;
	canvas.height = 300;
	var context = canvas.getContext('2d');

	let img = new Image();
	img.src = './001.png';
	img.onload = function () {
		context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
	}
})();
