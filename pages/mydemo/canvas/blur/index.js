(function(){
	var config = {
		img: './002.jpg',
		r: 50,
		x: 500,
		y: 200,
		v: 1
	};
	var current = {
		isPlay: false
	};
	var timer;

	var box = document.getElementById('box');
	var img = document.getElementById('backimg');
	var canvas = document.getElementById('canvas');
	var resetBtn = document.getElementById('resetBtn');
	var showBtn = document.getElementById('showBtn');
	box.style.width = window.innerWidth + 'px';
	box.style.height = window.innerHeight + 'px';
	img.src = config.img;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var context = canvas.getContext('2d');
	var markCanvas = getMarkCanvas();
	init();


	img.onload = function () {
		draw();
	};

	resetBtn.addEventListener('click', function() {
		clearInterval(timer);
		init();
		draw();
	}, false);

	showBtn.addEventListener('click', function() {
		if (!current.isPlay) {
			current.isPlay = true;
			timer = setInterval(function () {
				current.r += config.v;
				draw();
				if (current.r >= (canvas.width + canvas.height)) {
					clearInterval(timer);
				}
			}, 20);
		}
	}, false);

	function init() {
		config.x = 200 + (Math.random() * (canvas.width - 200 * 2));
		config.y = 100 + (Math.random() * (canvas.height - 400));
		current.x = config.x;
		current.y = config.y;
		current.r = config.r;
		current.isPlay = false;
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.save();
		context.beginPath();
		context.arc(current.x, current.y, current.r, 0, 2 * Math.PI, false);
		context.strokeStyle = '#fff';
		//context.stroke();
		context.closePath();
		context.clip();
		context.drawImage(img, 0, 0, canvas.width, canvas.height);
		context.restore();
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
