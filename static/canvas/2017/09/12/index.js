(function() {
	var config = {
		srcs: ['./img/01.jpg', './img/02.jpeg'],
		srcIndex: -1,
		canvasWidth: window.innerHeight - 100
	};

	var canvas = document.getElementById('canvas');
	canvas.width = canvas.height = config.canvasWidth;
	var context = canvas.getContext('2d');
	var box = canvas.getBoundingClientRect();
	var changeImgBtn = document.getElementById('changeImgBtn');
	var img = new Image();

	var imgData = [];
	var balls = [];
	var mouseWork = false;
	var prePoint = {
		x: -100,
		y: -100
	};

	changeImgBtn.onclick = setImageSrc;
	canvas.addEventListener('mousemove', drawByEvent, false);

	setImageSrc();
	img.onload = draw;

	function draw() {
		initImgData();
		drawFirstBall();
		mouseWork = true;

		function drawFirstBall() {
			var ball = new Ball(canvas.width / 2, canvas.height / 2, config.canvasWidth / 2);
			var timeStep = 20;
			var cnt = 0;
			var time = 20;
			var step = 0.5 * config.canvasWidth / time;

			var timer = setInterval(function() {
				context.clearRect(0, 0, canvas.width, canvas.height);
				cnt++;
				
				context.beginPath();	
				context.fillStyle = colorStr(ball);
				context.arc(ball.x, ball.y, cnt * step, 0, 2 * Math.PI, false);
				context.closePath();
				context.fill();

				if (cnt >= time) {
					clearInterval(timer);
					balls.push(ball);
				}
			}, timeStep);
		}

		/**
		 * 初始化imgData数据
		 */
		function initImgData() {
			imgData = [];
			var _canvas = document.createElement('canvas');
			_canvas.width = config.canvasWidth;
			_canvas.height = config.canvasWidth;
			var _context = _canvas.getContext('2d');
			_context.drawImage(img, 0, 0, _canvas.width, _canvas.height);
			var data = _context.getImageData(0, 0, _canvas.width, _canvas.height).data

			for (var y = 0; y < config.canvasWidth; y++) {
				var row = [];
				for (var x = 0; x < config.canvasWidth; x++) {
					var d = config.canvasWidth * y + x;
					row.push(new Pixel(data[4 * d], data[4 * d + 1], data[4 * d + 2], data[4 * d + 3]));
				}
				imgData.push(row);
			}
		}

	}

	function drawByEvent(e) {
		if (mouseWork ) {
			var point = getPointByEvent(e);

			for (var i = 0; i < balls.length; i++) {
				var ball = balls[i];
				if (ball) {
					context.beginPath();
					context.fillStyle = colorStr(ball);
					context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
					if (context.isPointInPath(point.x, point.y) && !context.isPointInPath(prePoint.x, prePoint.y) && ball.r > 3) {
						var b1 = new Ball(ball.x - ball.r / 2, ball.y - ball.r / 2, ball.r / 2);
						var b2 = new Ball(ball.x - ball.r / 2, ball.y + ball.r / 2, ball.r / 2);
						var b3 = new Ball(ball.x + ball.r / 2, ball.y - ball.r / 2, ball.r / 2);
						var b4 = new Ball(ball.x + ball.r / 2, ball.y + ball.r / 2, ball.r / 2);

						drawAnimatBalls(ball, b1, b2, b3, b4);
						delete balls[i];
					}
				}
			}
			prePoint.x = point.x;
			prePoint.y = point.y;
		}
	}

	function drawAnimatBalls(ball, b1, b2, b3, b4) {
		var timeStep = 20;
		var cnt = 0;
		var time = 10;
		var step = 0.5 * ball.r / time;
		
		var timer = setInterval(function() {
			context.clearRect(ball.x - ball.r, ball.y - ball.r, 2 * ball.r, 2 * ball.r);
			cnt++;

			context.beginPath();	
			context.fillStyle = colorStr(b1);
			context.arc(ball.x - cnt * step, ball.y - cnt * step, ball.r - cnt * step, 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();

			context.beginPath();	
			context.fillStyle = colorStr(b1);
			context.arc(ball.x - cnt * step, ball.y + cnt * step, ball.r - cnt * step, 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();

			context.beginPath();	
			context.fillStyle = colorStr(b1);
			context.arc(ball.x + cnt * step, ball.y - cnt * step, ball.r - cnt * step, 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();
			context.beginPath();	
			context.fillStyle = colorStr(b1);
			context.arc(ball.x + cnt * step, ball.y + cnt * step, ball.r - cnt * step, 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();

			if (cnt >= time) {
				clearInterval(timer);
				balls.push(b1);
				balls.push(b2);
				balls.push(b3);
				balls.push(b4);
			}
		}, timeStep);
	}

	function colorStr(ball) {
		var d = imgData[Math.round(ball.y)][Math.round(ball.x)];
		return 'rgba(' + d.red + ', ' + d.green + ', ' + d.blue + ', ' + d.alpha + ')';
	}

	function getPointByEvent(e) {
		var ex = e.clientX - box.left;
		var ey = e.clientY - box.top;
		return {
			x: ex,
			y: ey
		};
	}

	/**
	 * 重新设置图片源
	 */
	function setImageSrc() {
		while(true) {
			var index = Math.floor(Math.random() * config.srcs.length);
			if (index != config.srcIndex) {
				config.srcIndex = index;
				break;
			}
		}
		img.src = config.srcs[config.srcIndex];
		imgData = [];
		balls = [];
	}

	function Ball(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	/**
	 * 像素点
	 */
	function Pixel(red, green, blue, alpha) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}
	
})();
	
