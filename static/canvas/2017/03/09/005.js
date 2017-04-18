(function(){
	var canvas = document.getElementById('mycanvas');
	canvas.width = 400;
	canvas.height = 400;
	var context = canvas.getContext('2d');
	
	drawStar(200, 200, 100, -Math.PI / 2);

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
