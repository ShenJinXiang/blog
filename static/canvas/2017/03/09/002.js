(function(){
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext("2d");

	strokeStar(context, 5, 100, 100, 75, 35, -Math.PI / 2);

	context.lineWidth = 3;
	context.strokeStyle = '#058';
	strokeStar(context, 5, 300, 100, 75, 35, -Math.PI / 2);

	context.fillStyle = 'yellow';
	fillStar(context, 5, 100, 300, 75, 35, -Math.PI / 2);

	fillStar(context, 5, 300, 300, 75, 35, -Math.PI / 2);
	strokeStar(context, 5, 300, 300, 75, 35, -Math.PI / 2);
})();

/**
 * 绘制边框
 */
function strokeStar(ctx, num, sx, sy, R, r, rotate) {
	ctx.save();
	ctx.translate(sx, sy);
	ctx.rotate(rotate);
	ctx.beginPath();
	for (var i = 0; i < num; i++) {
		ctx.lineTo(Math.cos(i * 2 * Math.PI / num) * R, 
				Math.sin(i * 2 * Math.PI / num) * R);
		ctx.lineTo(Math.cos(i * 2 * Math.PI / num + Math.PI / num) * r, 
				Math.sin(i * 2 * Math.PI / num + Math.PI / num) * r);
	}
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

/**
 * 填充
 */
function fillStar(ctx, num, sx, sy, R, r, rotate) {
	ctx.save();
	ctx.translate(sx, sy);
	ctx.rotate(rotate);
	ctx.beginPath();
	for (var i = 0; i < num; i++) {
		ctx.lineTo(Math.cos(i * 2 * Math.PI / num) * R, 
				Math.sin(i * 2 * Math.PI / num) * R);
		ctx.lineTo(Math.cos(i * 2 * Math.PI / num + Math.PI / num) * r, 
				Math.sin(i * 2 * Math.PI / num + Math.PI / num) * r);
	}
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}
