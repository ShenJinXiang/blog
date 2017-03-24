(function(){
	let config = {
		img: './001.jpg',
		r: 50,
		x: 500,
		y: 200,
		v: 1
	};
	let current = {
		isPlay: false
	};
	let timer;

	let box = document.getElementById('box');
	let img = document.getElementById('backimg');
	let canvas = document.getElementById('canvas');
	let resetBtn = document.getElementById('resetBtn');
	let showBtn = document.getElementById('showBtn');
	box.style.width = window.innerWidth + 'px';
	box.style.height = window.innerHeight + 'px';
	img.src = config.img;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let context = canvas.getContext('2d');

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
	}
})();
