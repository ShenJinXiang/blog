(function(){
	let config = {
		img: './001.jpg'
	};

	let img = new Image();
	img.src = config.img;
	img.width = window.innerWidth;
	img.height = window.innerHeight;

	document.body.appendChild(img);
})();
