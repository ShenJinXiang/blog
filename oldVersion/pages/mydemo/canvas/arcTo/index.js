(function() {
		var canvas = document.getElementById('canvas');
		canvas.width = 800;
		canvas.height = 600;
		var context = canvas.getContext('2d');
		var markCanvas = getMarkCanvas();

		var range = document.getElementById('range');
		var rangeMsg = document.getElementById('rangeMsg');

		var point = [
			{x: 200, y: 300},
			{x: 400, y: 100},
			{x: 600, y: 300}
		];
		var current = {
			isDown: false,
			isMove: false,
			mouseX: -1,
			mouseY: -1,
			pIndex: -1
		};

		canvas.onmousemove = mouseMove;
		document.body.onmouseup = mouseUp;
		canvas.onmousedown = mouseDown;
		range.onmousemove = rangeChange;

		draw();

		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawBaseLine();
			drawBezier();
			context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);

			function drawBaseLine() {
				context.lineWidth = 1;

				for (var i = 0; i < point.length; i++) {
					context.strokeStyle = '#444';
					context.beginPath();
					if (i == current.pIndex && current.isDown && current.isMove) {
						context.arc(current.mouseX, current.mouseY, 10, 0, 2 * Math.PI, false);
						point[i].x = current.mouseX;
						point[i].y = current.mouseY;
					} else {
						context.arc(point[i].x, point[i].y, 10, 0, 2 * Math.PI, false);
					}
					context.stroke();
					if (context.isPointInPath(current.mouseX, current.mouseY)) {
						current.pIndex = i;
					}
				}
				context.strokeStyle = '#888';
				context.beginPath();
				context.lineTo(point[0].x, point[0].y);
				context.lineTo(point[1].x, point[1].y);
				context.lineTo(point[2].x, point[2].y);
				context.stroke();
			}

			function drawBezier() {
				context.lineWidth = 5;
				context.strokeStyle = '#058';
				context.beginPath();
				context.moveTo(point[0].x, point[0].y);
				context.arcTo(point[1].x, point[1].y, point[2].x, point[2].y, range.value);
				context.stroke();

				var code = '<li>context.lineWidth = 5;</li>'
						+ '<li>context.strokeStyle = "#058";</li>'
						+ '<li>context.beginPath();</li>'
						+ '<li>context.moveTo(' + point[0].x + ', ' + point[0].y + ');</li>'
						+ '<li>context.arcTo(' + point[1].x + ', ' + point[1].y + ', ' + point[2].x + ', ' + point[2].y + ', ' + range.value +');</li>'
						+ '<li>context.stroke();</li>'
				var codeNode = document.getElementById('code');
				codeNode.innerHTML = code;
			}
		}

		function mouseMove(e) {
			if (current.isDown) {
				var mouse = getMouse(e);
				current.mouseX = mouse.x;
				current.mouseY = mouse.y;
				current.isMove = true;
				draw();
			}
		}

		function mouseDown(e) {
			var mouse = getMouse(e);
			current.mouseX = mouse.x;
			current.mouseY = mouse.y;
			current.isDown = true;
		}

		function mouseUp(e) {
			current.mouseX = -1;
			current.mouseY = -1;
			current.pIndex = -1;
			current.isMove = false;
			current.isDown = false;
		}

		function rangeChange() {
			rangeMsg.innerHTML = "当前半径：" + range.value;
			draw();
		}
		
		function getMouse(e) {
			var box = canvas.getBoundingClientRect();
			return {
				x: e.clientX - box['left'],
				y: e.clientY - box['top']
			};
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
