(function(){
	var canvas = document.getElementById('mycanvas');
	canvas.width = 660;
	canvas.height = canvas.width * 2 / 3;
	var context = canvas.getContext('2d');
	
	var gWidth = canvas.width / 30;

	var maxX = 5, maxY = 5;		// 大五角星的坐标
	var minX = [10, 12, 12, 10];	// 小五角星的x坐标值
	var minY = [2, 4, 7, 9];		// 小五角星的y坐标值

	draw();
	drawBaseLines();

	function draw() {
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

	function drawBaseLines() {
		context.lineWidth = 1;
		context.strokeStyle = '#444';

		context.beginPath();
		context.lineTo(canvas.width / 2, 0);
		context.lineTo(canvas.width / 2, canvas.height);
		context.closePath();
		context.stroke();

		context.beginPath();
		context.lineTo(0, canvas.height / 2);
		context.lineTo(canvas.width, canvas.height / 2);
		context.closePath();
		context.stroke();
		
		context.strokeStyle = '#666';
		for (var i = 1; i < 15; i++) {
			context.beginPath();
			context.lineTo(i * gWidth, 0);
			context.lineTo(i * gWidth, canvas.height / 2);
			context.closePath();
			context.stroke();
		}
		for (var i = 1; i < 10; i++) {
			context.beginPath();
			context.lineTo(0, i * gWidth);
			context.lineTo(canvas.width / 2, i * gWidth);
			context.closePath();
			context.stroke();
		}

		context.beginPath();
		context.arc(maxX * gWidth, maxY * gWidth, 3 * gWidth, 0, 2 * Math.PI, false);
		context.closePath();
		context.stroke();

		for (var i = 0; i < 4; i++) {
			context.beginPath();
			context.arc(minX[i] * gWidth, minY[i] * gWidth, gWidth, 0, 2 * Math.PI, false);
			context.closePath();
			context.stroke();

			context.beginPath();
			context.lineTo(maxX * gWidth, maxY * gWidth);
			context.lineTo(minX[i] * gWidth, minY[i] * gWidth);
			context.closePath();
			context.stroke();
		}
	}
})();
