(function() {
		var canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		console.log(canvas.width);
		console.log(canvas.height);
		var context = canvas.getContext('2d');

		var balls = [];
		var count = 0;

		var config = {
			vx: -1,
			vy: -0.5,
			time: 15,
		};

		initBalls();

		setInterval(function () {
			draw();
			update();
		}, config.time);

		window.onresize = function () {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			draw();
			update();
		}
		function initBalls() {
			for (var i = 0; i < 500; i++) {
				balls.push({
						x: Math.random() * canvas.width * 2,
						y: Math.random() * canvas.height,
						r: Math.random() * 2
				});
			}
		}

		function draw() {

			drawBackground();
			drawMarkCanvas();

			function drawMarkCanvas() {
				var markCanvas = getMarkCanvas();
				context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
			}

			function drawBackground() {
				context.clearRect(0, 0, canvas.width, canvas.height);

				var clg = context.createLinearGradient(canvas.width / 2, canvas.height, canvas.width / 2, 0);
				clg.addColorStop(0, '#001339');
				clg.addColorStop(1, '#06080E');
				context.fillStyle = clg;
				context.fillRect(0, 0, canvas.width, canvas.height);

				for (var i = 0; i < balls.length; i++) {
					context.beginPath();
					context.fillStyle = '#fff';
					context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2, false);
					context.fill();
				}
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
		}

		function update() {
			count++;
			if (count >= Math.abs(50 / config.vy)) {
				for (var i = 0; i < 25; i++) {
					balls.push({
							x: Math.random() * canvas.width * 2,
							y: Math.random() * 50 + canvas.height,
							r: Math.random() * 2
					});
				}
				count = 0;
			}

			for (var i = 0; i < balls.length; i++) {
				balls[i].x += config.vx;
				balls[i].y += config.vy;
			}

			var cnt = 0;
			for (var i = 0; i < balls.length; i++) {
				if (balls[i].y >= 0) {
					balls[cnt++] = balls[i];
				}
			}

			while(balls.length > cnt) {
				balls.pop();
			}
		}
})();
