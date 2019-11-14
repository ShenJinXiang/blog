$(function() {
	var config = {
		backColor: '#333',
		scale: 3,
		r: 100
	};
	var img = $("#image")[0];
	var title = $("#title").val();
	var data = {
		canvas: {},
		offCanvas: {}
	};

	var canvas = document.createElement('canvas');
	var offCanvas = document.createElement('canvas');
	var markCanvas = getMarkCanvas();
	var context = canvas.getContext('2d');
	var offContext = offCanvas.getContext('2d');
	draw();
	$('body').append(canvas);

	$(window).resize(function() {
		draw();
	});

	$(canvas).mousemove(function(e) {
		var point = windowToCanvas(e.clientX, e.clientY);
		drawMagnifier(point);
	});

	function draw() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		initData();
		drawImg();
	}

	function initData() {
		data.canvas.width = canvas.width;
		data.canvas.height = canvas.height;

		var scale;
		if (img.width < canvas.width - 100 && img.height < canvas.height - 80) {
			scale = 1;
			data.canvas.imgx = (canvas.width - img.width) / 2;
			data.canvas.imgy = (canvas.height - img.height) / 2;
			data.canvas.imgw = img.width;
			data.canvas.imgh = img.height;
		} else {
			var xScl = img.width / (canvas.width - 100);
			var yScl = img.height / (canvas.height - 80);
			scale = (xScl > yScl) ? xScl : yScl;
			var imgW = img.width / scale;
			var imgH = img.height / scale;
			data.canvas.imgx = (canvas.width - imgW) / 2;
			data.canvas.imgy = (canvas.height - imgH) / 2 - 30;
			data.canvas.imgw = imgW;
			data.canvas.imgh = imgH;
		}
		
		data.offCanvas.width = offCanvas.width = img.width / scale * config.scale;
		data.offCanvas.height = offCanvas.height = img.height / scale * config.scale;
	}

	function drawImg() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = config.backColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.drawImage(img, data.canvas.imgx, data.canvas.imgy, data.canvas.imgw, data.canvas.imgh);
		context.drawImage(markCanvas, canvas.width - markCanvas.width, canvas.height - markCanvas.height);
		offContext.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
		drawTitle();
	}
	
	function drawMagnifier(point) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		offContext.clearRect(0, 0, offCanvas.width, offCanvas.height);

		drawImg();

		context.save();
		context.beginPath();
		context.arc(point.x, point.y, config.r, 0, 2 * Math.PI, false);
		context.strokeStyle = '#069';
		context.stroke();
		context.clip();
		context.drawImage(
			offCanvas, 
			(1 - config.scale) * (point.x - data.canvas.imgx) + data.canvas.imgx, 
			(1 - config.scale) * (point.y - data.canvas.imgy) + data.canvas.imgy,
			offCanvas.width,
			offCanvas.height
		)
		context.restore();
	}

	function drawTitle() {
		context.fillStyle='#ddd';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = '40px cursive';
		context.fillText(title, canvas.width / 2, canvas.height - 30, 340);
		// context.fillText(title, 100, 100, 340);
	}

	function windowToCanvas(x, y) {
		var box = canvas.getBoundingClientRect();
		return {
			x: x - box.left,
			y: y - box.top
		};
	}

	/**
	 * 水印
	 */
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
});

