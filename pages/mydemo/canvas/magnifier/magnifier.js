(function(){
	var config = {
		src: './002.JPG',
		scale: 5,
		r: 100
	};

	var data = {
		canvas: {},
		offCanvas: {}
	};

	var canvas = document.getElementById('canvas');
	var offCanvas = document.createElement('canvas');
	canvas.width = window.innerWidth - 200;
	canvas.height = window.innerHeight - 50;
	var context = canvas.getContext('2d');
	var offContext = offCanvas.getContext('2d');
	
	var img = new Image();
	img.src = config.src;
	img.onload = function () {
		initData();
		console.log(data);
		drawImg();
	}

	canvas.addEventListener('mousemove', function(e) {
		var point = windowToCanvas(e.clientX, e.clientY);
		drawMagnifier(point);
	}, false);


	function initData() {
		data.canvas.width = canvas.width;
		data.canvas.height = canvas.height;

		var scale;
		if (img.width < canvas.width && img.height < canvas.height) {
			scale = 1;
			data.canvas.imgx = (canvas.width - img.width) / 2;
			data.canvas.imgy = (canvas.height - img.height) / 2;
			data.canvas.imgw = img.width;
			data.canvas.imgh = img.height;
		} else {
			var xScl = img.width / canvas.width;
			var yScl = img.height / canvas.height;
			scale = (xScl > yScl) ? xScl : yScl;
			var imgW = img.width / scale;
			var imgH = img.height / scale;
			data.canvas.imgx = (canvas.width - imgW) / 2;
			data.canvas.imgy = (canvas.height - imgH) / 2;
			data.canvas.imgw = imgW;
			data.canvas.imgh = imgH;
		}
		
		data.offCanvas.width = offCanvas.width = img.width / scale * config.scale;
		data.offCanvas.height = offCanvas.height = img.height / scale * config.scale;
	}

	function drawImg() {
		context.drawImage(img, data.canvas.imgx, data.canvas.imgy, data.canvas.imgw, data.canvas.imgh);
		offContext.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
	}

	function drawMagnifier(point) {
		debugger;
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

	function windowToCanvas(x, y) {
		var box = canvas.getBoundingClientRect();
		return {
			x: x - box.left,
			y: y - box.top
		};
	}
})();
