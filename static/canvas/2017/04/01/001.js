(function() {
	var canvas = document.getElementById('mycanvas');
	canvas.width = 600;
	canvas.height = 150;
	var context = canvas.getContext('2d');

	context.font = '40px 宋体';
	context.fillText('申锦祥', 75, 50);
		
	context.font = '40px Arial';
	context.fillText('www.shenjinxiang.com', 75, 115);
})();
