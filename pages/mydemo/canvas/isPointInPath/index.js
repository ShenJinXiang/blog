(function (){
	let canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window. innerHeight;
	let context = canvas.getContext('2d');

	// 配置信息
	let config = {
		num: 20,
		minr: 10,
		maxr: 40,
		bcolor: '#059',
		ccolor: 'red'
	};

	let balls = [];
	let box = canvas.getBoundingClientRect();

	init();

	// 初始化
	function init() {
		for (let i = 0; i < config.num; i++) {
			balls[i] = {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				r: Math.random() * (config.maxr - config.minr) + config.minr
			};
		}
		draw();
	}

	// 绑定事件
	canvas.addEventListener('mousemove', draw, false);
	window.onresize = function () {
		init();
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	function draw(e) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		let x = -1000, y = -1000;
		if (e) {
			x = e.clientX - box.left;
			y = e.clientY - box.top;
		}
		for (let i = 0; i < balls.length; i++) {
			context.beginPath();
			context.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI, false);
			if (context.isPointInPath(x, y)) {
				context.fillStyle = config.ccolor;
			} else {
				context.fillStyle = config.bcolor;
			}
			context.fill();
			context.closePath();
		}
	}
})();

