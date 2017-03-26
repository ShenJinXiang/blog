(function (){
	var canvas = document.getElementById('canvas');
	var markCanvas = getMarkCanvas();
	canvas.width = window.innerWidth;
	canvas.height = window. innerHeight;
	var context = canvas.getContext('2d');

	// 配置信息
	var config = {
		num: 20,
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

