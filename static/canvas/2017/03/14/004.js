(function() {
	CanvasRenderingContext2D.prototype.strokeRoundRect = function (x, y, width, height, r) {
		this.save();
		this.translate(x, y);
		roundRect(this, width, height, r);
		this.stroke();
		this.restore();
	};

	CanvasRenderingContext2D.prototype.fillRoundRect = function (x, y, width, height, r) {
		this.save();
		this.translate(x, y);
		roundRect(this, width, height, r);
		this.fill();
		this.restore();
	};

	function roundRect(ctx, width, height, r) {
		ctx.beginPath();
		ctx.arc(width - r, height - r, r, 0, 0.5 * Math.PI, false);
		ctx.lineTo(r, height);
		ctx.arc(r, height - r, r, 0.5 * Math.PI, Math.PI, false);
		ctx.lineTo(0, r);
		ctx.arc(r, r, r, Math.PI, 1.5 * Math.PI, false);
		ctx.lineTo(width -r, 0);
		ctx.arc(width -r, r, r, 1.5 * Math.PI, 0, false);
		ctx.closePath();
	}

	draw();
	function draw() {
		var canvas = document.getElementById('mycanvas');
		canvas.width = 400;
		canvas.height = 400;
		var context = canvas.getContext('2d');

		context.strokeRoundRect(50, 50, 100, 100, 25);

		context.lineWidth = 3;
		context.strokeStyle = '#058';
		context.strokeRoundRect(250, 50, 100, 100, 25);
			
		context.fillStyle='#058';
		context.fillRoundRect(50, 250, 100, 100, 25);
		
		context.fillStyle = 'yellow';
		context.fillRoundRect(250, 250, 100, 100, 25);
		context.strokeRoundRect(250, 250, 100, 100, 25);
	}
})();
