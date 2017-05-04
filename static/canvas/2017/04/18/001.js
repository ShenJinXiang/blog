(function (){
	var canvas = document.getElementById('mycanvas');
	canvas.width = window.innerWidth - 2;
	canvas.height = window. innerHeight - 2;
	var context = canvas.getContext('2d');

	// 配置信息
	var config = {
		num: 8,
		minr: 10,
		maxr: 40,
		bcolor: '#059',
		ccolor: 'red'
	};

	var balls = [];
	var box = canvas.getBoundingClientRect();

	init();

	// 初始化
	function init() {
		for (var i = 0; i < config.num; i++) {
			balls[i] = {
				x: config.maxr + Math.random() * (canvas.width - 2 * config.maxr),
				y: config.maxr + Math.random() * (canvas.height - 2 * config.maxr),
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
		var x = -1000, y = -1000;
		if (e) {
			x = e.clientX - box.left;
			y = e.clientY - box.top;
		}
		for (var i = 0; i < balls.length; i++) {
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
