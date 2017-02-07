(function() {
		let canvas = document.getElementById('canvas');
		canvas.width = 800;
		canvas.height = 600;
		let context = canvas.getContext('2d');
		let markCanvas = getMarkCanvas();

		let point = [
			{x: 200, y: 300},
			{x: 400, y: 100},
			{x: 600, y: 300}
		];
		let current = {
			isDown: false,
			isMove: false,
			mouseX: -1,
			mouseY: -1,
			pIndex: -1
		};

		canvas.onmousemove = mouseMove;
		document.body.onmouseup = mouseUp;
		canvas.onmousedown = mouseDown;

		draw();

		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawBaseLine();
			drawBezier();
			context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);

			function drawBaseLine() {
				context.lineWidth = 1;

				for (let i = 0; i < point.length; i++) {
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
				context.quadraticCurveTo(point[1].x, point[1].y, point[2].x, point[2].y);
				context.stroke();

				let code = '<li>context.lineWidth = 5;</li>'
						+ '<li>context.strokeStyle = "#058";</li>'
						+ '<li>context.beginPath();</li>'
						+ '<li>context.moveTo(' + point[0].x + ', ' + point[0].y + ');</li>'
						+ '<li>context.quadraticCurveTo(' + point[1].x + ', ' + point[1].y + ', ' + point[2].x + ', ' + point[2].y + ');</li>'
						+ '<li>context.stroke();</li>'
				let codeNode = document.getElementById('code');
				codeNode.innerHTML = code;
			}
		}

		function mouseMove(e) {
			if (current.isDown) {
				let mouse = getMouse(e);
				current.mouseX = mouse.x;
				current.mouseY = mouse.y;
				current.isMove = true;
				draw();
			}
		}

		function mouseDown(e) {
			let mouse = getMouse(e);
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
		
		function getMouse(e) {
			let box = canvas.getBoundingClientRect();
			return {
				x: e.clientX - box['left'],
				y: e.clientY - box['top']
			};
		}

		function getMarkCanvas() {
			let markCanvas = document.createElement('canvas');
			markCanvas.width = 400;
			markCanvas.height = 100;
			let ctx = markCanvas.getContext('2d');
			
			ctx.fillStyle = 'rgba(204, 204, 204, 0.5)';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.font = '40px cursive';
			ctx.fillText('www.shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2, 340);
			return markCanvas;
		}
})();
