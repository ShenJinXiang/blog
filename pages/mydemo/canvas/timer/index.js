(function(){
	// 全局配置
	var config = {
		canvasId : 'canvas',   // canvas元素的id值
		canvasWidth : window.innerWidth,   // canvas的宽度
		canvasHeight : window.innerHeight,   // canvas的高度
		color : '#058',   // 颜色
		radius : 5,   // 圆的半径
		left : (window.innerWidth - 108 * 6) / 2,   // 左上角的左边距
		top : 50,   // 左上角的上边距
		isAnimate : true,   // 是否显示动画
		// 数字 数组 1-9 :
		digit : [
			[ [0,0,1,1,1,0,0], [0,1,1,0,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,0,1,1,0], [0,0,1,1,1,0,0] ],//0
			[ [0,0,0,1,1,0,0], [0,1,1,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [1,1,1,1,1,1,1] ],//1
			[ [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,0,1,1,0,0,0], [0,1,1,0,0,0,0], [1,1,0,0,0,0,0], [1,1,0,0,0,1,1], [1,1,1,1,1,1,1] ],//2
			[ [1,1,1,1,1,1,1], [0,0,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,0,1,1,1,0,0], [0,0,0,0,1,1,0], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//3
			[ [0,0,0,0,1,1,0], [0,0,0,1,1,1,0], [0,0,1,1,1,1,0], [0,1,1,0,1,1,0], [1,1,0,0,1,1,0], [1,1,1,1,1,1,1], [0,0,0,0,1,1,0], [0,0,0,0,1,1,0], [0,0,0,0,1,1,0], [0,0,0,1,1,1,1] ],//4
			[ [1,1,1,1,1,1,1], [1,1,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,1,1,1,0], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//5
			[ [0,0,0,0,1,1,0], [0,0,1,1,0,0,0], [0,1,1,0,0,0,0], [1,1,0,0,0,0,0], [1,1,0,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//6
			[ [1,1,1,1,1,1,1], [1,1,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,1,1,0,0,0], [0,0,1,1,0,0,0], [0,0,1,1,0,0,0], [0,0,1,1,0,0,0] ],//7
			[ [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//8
			[ [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,1,1,0,0,0,0] ],//9
			[ [0,0,0,0], [0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0] ]//:
		],
		// 随机颜色
		colors : [
			"#ffff00", "#ffff33", "#ffff66", "#ffff99", "#ffffcc", "#ffffff",  "#ccffff", "#ccffcc", "#ccff99", "#ccff66", "#ccff33", "#ccff00", 
			"#ffcc00", "#ffcc33", "#ffcc66", "#ffcc99", "#ffcccc", "#ffccff",  "#ccccff", "#cccccc", "#cccc99", "#cccc66", "#cccc33", "#cccc00", 
			"#ff9900", "#ff9933", "#ff9966", "#ff9999", "#ff99cc", "#ff99ff",  "#cc99ff", "#cc99cc", "#cc9999", "#cc9966", "#cc9933", "#cc9900", 
			"#ff6600", "#ff6633", "#ff6666", "#ff6699", "#ff66cc", "#ff66ff",  "#cc66ff", "#cc66cc", "#cc6699", "#cc6666", "#cc6633", "#cc6600", 
			"#ff3300", "#ff3333", "#ff3366", "#ff3399", "#ff33cc", "#ff33ff",  "#cc33ff", "#cc33cc", "#cc3399", "#cc3366", "#cc3333", "#cc3300", 
			"#ff0000", "#ff0033", "#ff0066", "#ff0099", "#ff00cc", "#ff00ff",  "#cc00ff", "#cc00cc", "#cc0099", "#cc0066", "#cc0033", "#cc0000", 
		
			"#660000", "#660033", "#660066", "#660099", "#6600cc", "#6600ff",  "#9900ff", "#9900cc", "#990099", "#990066", "#990033", "#990000", 
			"#663300", "#663333", "#663366", "#663399", "#6633cc", "#6633ff",  "#9933ff", "#9933cc", "#993399", "#993366", "#993333", "#993300", 
			"#666600", "#666633", "#666666", "#666699", "#6666cc", "#6666ff",  "#9966ff", "#9966cc", "#996699", "#996666", "#996633", "#996600", 
			"#669900", "#669933", "#669966", "#669999", "#6699cc", "#6699ff",  "#9999ff", "#9999cc", "#999999", "#999966", "#999933", "#999900", 
			"#66cc00", "#66cc33", "#66cc66", "#66cc99", "#66cccc", "#66ccff",  "#99ccff", "#99cccc", "#99cc99", "#99cc66", "#99cc33", "#99cc00", 
			"#66ff00", "#66ff33", "#66ff66", "#66ff99", "#66ffcc", "#66ffff",  "#99ffff", "#99ffcc", "#99ff99", "#99ff66", "#99ff33", "#99ff00", 
		
			"#33ff00", "#33ff33", "#33ff66", "#33ff99", "#33ffcc", "#33ffff",  "#00ffff", "#00ffcc", "#00ff99", "#00ff66", "#00ff33", "#00ff00", 
			"#33cc00", "#33cc33", "#33cc66", "#33cc99", "#33cccc", "#33ccff",  "#00ccff", "#00cccc", "#00cc99", "#00cc66", "#00cc33", "#00cc00", 
			"#339900", "#339933", "#339966", "#339999", "#3399cc", "#3399ff",  "#0099ff", "#0099cc", "#009999", "#009966", "#009933", "#009900", 
			"#336600", "#336633", "#336666", "#336699", "#3366cc", "#3366ff",  "#0066ff", "#0066cc", "#006699", "#006666", "#006633", "#006600", 
			"#333300", "#333333", "#333366", "#333399", "#3333cc", "#3333ff",  "#0033ff", "#0033cc", "#003399", "#003366", "#003333", "#003300", 
			"#330000", "#330033", "#330066", "#330099", "#3300cc", "#3300ff",  "#0000ff", "#0000cc", "#000099", "#000066", "#000033", "#000000"
		]
	};

	/**
	 * 主函数
	 */
	function main() {
		var canvas = document.getElementById(config.canvasId);
		canvas.width = config.canvasWidth;
		canvas.height = config.canvasHeight;
		var ctx = canvas.getContext("2d");

		var show = getCurrentTimeStr();
		var balls = [];
		setInterval(function(){
			drawTime();
			drawMark();
			update();
		}, 50);

		/**
		 * 画时间 取show的值
		 */
		function drawTime() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// hour
			drawDigit(config.left, config.top, show[0]);
			drawDigit(config.left + 15 * (config.radius + 1), config.top, show[1]);

			// :
			drawDigit(config.left + 30 * (config.radius + 1), config.top, 10);

			// minute
			drawDigit(config.left + 39 * (config.radius + 1), config.top, show[2]);
			drawDigit(config.left + 54 * (config.radius + 1), config.top, show[3]);

			// :
			drawDigit(config.left + 69 * (config.radius + 1), config.top, 10);

			// second
			drawDigit(config.left + 78 * (config.radius + 1), config.top, show[4]);
			drawDigit(config.left + 93 * (config.radius + 1), config.top, show[5]);

			if(config.isAnimate) {
				for(var i = 0; i < balls.length; i++) {
					ctx.beginPath();
					ctx.fillStyle = balls[i].color;
					ctx.arc(balls[i].x, balls[i].y, config.radius, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
				}
				console.log(balls.length);
			}
		}

		/**
		 * 更改
		 */
		function update() {
			var currentShow = getCurrentTimeStr();
			if(config.isAnimate) {		// 判断是否显示动画
				if(currentShow[0] != show[0]) {
					addBalls(config.left, config.top, show[0]);
				}
				if(currentShow[1] != show[1]) {
					addBalls(config.left + 15 * (config.radius + 1), config.top, show[1]);
				}
				if(currentShow[2] != show[2]) {
					addBalls(config.left + 39 * (config.radius + 1), config.top, show[2]);
				}
				if(currentShow[3] != show[3]) {
					addBalls(config.left + 54 * (config.radius + 1), config.top, show[3]);
				}
				if(currentShow[4] != show[4]) {
					addBalls(config.left + 78 * (config.radius + 1), config.top, show[4]);
				}
				if(currentShow[5] != show[5]) {
					addBalls(config.left + 93 * (config.radius + 1), config.top, show[5]);
				}
				updateBalls();
			}
			show = currentShow;
		}

		/**
		 * 添加ball
		 */
		function addBalls(x, y, index) {
			var digit = config.digit[index];
			for(var i = 0; i < digit.length; i++) {
				for(var j = 0; j < digit[i].length; j++) {
					if(digit[i][j] == 1) {
						var ball = {
							'x' : x + j * 2 * (config.radius + 1) + (config.radius + 1),
							'y' : y + i * 2 * (config.radius + 1) + (config.radius + 1),
							'g' : 1.5 + Math.random(),
							'vx' : Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
							'vy' : -5,
							'color' : config.colors[Math.floor(Math.random() * config.colors.length)]
						}
						balls.push(ball);
					}
				}
			}
		}

		/**
		 * 每次变更balls数组的数据 实现移动小球 并清除不在canvas内的小球
		 */
		function updateBalls() {
			for (var i = 0; i < balls.length; i++) {
				balls[i].x += balls[i].vx;
				balls[i].y += balls[i].vy;
				balls[i].vy += balls[i].g;

				if(balls[i].y >= canvas.height - config.radius) {
					balls[i].y = canvas.height - config.radius;
					balls[i].vy = -balls[i].vy * 0.75;
				}
			}

			var cnt = 0;
			for(var i = 0; i < balls.length; i++) {
				if(balls[i].x + config.radius > 0 && balls[i].x - config.radius < canvas.width) {
					balls[cnt++] = balls[i];
				}
			}

			while(balls.length > cnt) {
				balls.pop();
			}
		}

		/**
		 * 画数字和: x y 确定左上角的位置
		 */
		function drawDigit(x, y, index) {
			var digit = config.digit[index];
			for(var i = 0; i < digit.length; i++) {
				for(var j = 0; j < digit[i].length; j++) {
					if(digit[i][j] == 1) {
						ctx.beginPath();
						ctx.fillStyle = config.color;
						ctx.arc((2 * j + 1) * (config.radius + 1) + x, (2 * i + 1) * (config.radius + 1) + y, config.radius, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
					}
				}
			}
		}

		/**
		 * 获取当前时间的 时分秒组成的6位数组
		 */
		function getCurrentTimeStr() {
			var result = [];
			var _d = new Date();
			var _hour = _d.getHours();
			var _minute = _d.getMinutes();
			var _second = _d.getSeconds();
			result.push(Math.floor(_hour / 10));
			result.push(_hour % 10);
			result.push(Math.floor(_minute / 10));
			result.push(_minute % 10);
			result.push(Math.floor(_second / 10));
			result.push(_second % 10);
			return result;
		}

		function drawMark() {
			var markCanvas = getMarkCanvas();
			ctx.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
		}

		function getMarkCanvas() {
			var markCanvas = document.createElement('canvas');
			markCanvas.width = 400;
			markCanvas.height = 100;
			var ctx = markCanvas.getContext('2d');
			
			ctx.fillStyle = 'rgba(104, 104, 104, 0.5)';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.font = '40px cursive';
			ctx.fillText('www.shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2, 340);
			return markCanvas;
		}
	}

	// 执行主函数
	main();
}());
