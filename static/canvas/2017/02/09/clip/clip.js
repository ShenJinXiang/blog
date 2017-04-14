(function() {
	var canvas = document.getElementById('canvas');
	canvas.width = 660;
	canvas.height = canvas.width * 2 / 3;
	var context = canvas.getContext('2d');
	
	var config = {
		x: canvas.width / 2,
		y: canvas.height / 2,
		r: 100
	}
	var box = canvas.getBoundingClientRect();
	canvas.addEventListener('mousemove', function(e) {
		config.x = e.clientX - box.left;
		config.y = e.clientY - box.top;
		draw();
	}, false);

	draw();

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.save();
		context.beginPath();
		context.arc(config.x, config.y, config.r, 0, 2 * Math.PI, false);
		context.fillStyle = '#fff';
		context.fill();
		context.clip();

		drawGQ();
		context.restore();
	}

	function drawGQ() {

		var gWidth = canvas.width / 30;
		var [maxX, maxY] = [5, 5];		// 大五角星的坐标
		var minX = [10, 12, 12, 10];	// 小五角星的x坐标值
		var minY = [2, 4, 7, 9];		// 小五角星的y坐标值

		// 红色背景
		context.fillStyle = 'red';
		context.fillRect(0, 0, canvas.width, canvas.height);

		// 大五角星
		drawStar(maxX * gWidth, maxY * gWidth, 3 * gWidth, -Math.PI / 2);

		// 小五角星
		for (var i = 0; i < 4; i++) {
			drawStar(minX[i] * gWidth, minY[i] * gWidth, gWidth, 
					Math.PI + Math.atan((minY[i] - maxY ) / (minX[i] - maxX)));
		}
	}

	// 五角星
	function drawStar(x, y, r, rotate) {
		context.save();
		context.fillStyle = 'yellow';
		context.translate(x, y);
		context.scale(r, r);
		context.rotate(rotate);
		context.beginPath();
		var dig = 2 * 2 * Math.PI / 5;
		for(var i = 0; i < 5; i++) {
			context.lineTo(Math.cos(i * dig), Math.sin(i * dig));
		}
		context.closePath();
		context.fill();
		context.restore();
	}
})();

