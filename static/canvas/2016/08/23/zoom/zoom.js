(function(){

	var config = {
		img: './001.jpg',
		min: 0.5,
		max: 3
	};
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth - 200;
	canvas.height = window.innerHeight - 100;
	var context = canvas.getContext('2d');

	var range = document.getElementById('range');
	range.style.width = canvas.width + 'px';
	range.max = config.max;
	range.min = config.min;
	range.step = 0.01;
	range.value = 1;

	var markCanvas = getMarkCanvas();

	var img = new Image();
	img.src = config.img;
	img.onload = function () {
		draw(1);
	}

	range.addEventListener('mousemove', function() {
		var scale = range.value;
		draw(scale);
	});

	function draw(scale) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(img, (canvas.width - canvas.width * scale) / 2, (canvas.height - canvas.height * scale) / 2, scale * canvas.width, scale * canvas.height);
		context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
	}
	
	function getMarkCanvas() {
		var markCanvas = document.createElement('canvas');
		markCanvas.width = 400;
		markCanvas.height = 100;
		var ctx = markCanvas.getContext('2d');
		
		ctx.fillStyle = 'rgba(204, 204, 204, 0.5)';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '40px cursive';
		ctx.fillText('www.shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2, 340);
		return markCanvas;
	}
})();
