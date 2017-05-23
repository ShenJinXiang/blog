// ----------------------------------------------------------------------------------

function MyVideo(options) {
	this.config = options;
	this.video = document.createElement('video');
	this.video.src = this.config.src;

	this.video.
}

MyVideo.prototype.play = function() {
	this.video.play();
};

MyVideo.prototype.getVideo = function() {
	return this.video;
};

// ----------------------------------------------------------------------------------

(function() {
		var config = {
			width: 600,
			height: 450,
			video_src: './002.mp4'
		};

		start(config);

})();

function start(config) {
	var canvas = document.getElementById('canvas');
	canvas.width = config.width;
	canvas.height = config.height;
	var context = canvas.getContext('2d');

	var video = new MyVideo({
			src: config.video_src
	});
	console.log(video);

	video.play();
	setInterval(function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(video.getVideo(), 0, 0, canvas.width, canvas.height);
	}, 20);
}

function addEvent(dom, eType, func) {
	if (dom.addEventListener) {
		dom.addEventListener(eType, function(e) {
			func(e);
		});
	} else if (dom.attachEvent) {
		dom.attachEvent('on' + eType, function(e) {
			func(e);
		});
	} else {
		dom['on' + eType] = function(e) {
			func(e);
		}
	}
}

function second2Minute(second) {
	var time = parseInt(second);
	if (time < 60) {
			return '0' + ':' + ((time < 10) ? ('0' + time) : time );
	}
	var s = (time % 60);
	s = (s < 10) ? ('0' + s) : s;
	var m = Math.floor(time / 60);
	if (time < (60 * 60)) {
			return m + ':' + s;
	}
	var h = Math.floor(m / 60);
	m = m % 60;
	m = (m < 10) ? ('0' + m) : m;
	return h + ':' + m + ':' + s;
}
