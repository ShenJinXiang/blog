(function() {
	var config = {
		video_src: './002.mp4',
		//video_src: './001.mp4',
		width: 600,
		height: 400
	};
	var video = document.createElement('video');
	video.src = config.video_src;

	var canvas = document.getElementById('canvas');
	canvas.width = config.width;
	canvas.height = config.height;
	var context = canvas.getContext('2d');
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	var mainDiv = document.getElementById('mainDiv');
	var czDiv = document.getElementById('czDiv');
	var bfzjd = document.getElementById('bfzjd');
	var dqbfjd = document.getElementById('dqbfjd');
	var bfzt = document.getElementById('bfzt');
	var sjxx = document.getElementById('sjxx');
	var zdhcz = document.getElementById('zdhcz');
	czDiv.style.width = config.width + 'px';
	var timer;
	var rect;
	var isDown = false;

	addEvent(video, 'loadedmetadata', function() {
		rect = getRectData();
		sjxx.innerText = '0:00 / ' + second2Minute(video.duration);
	});

	addEvent(video, 'ended', function() {
		bfzt.className = 'bf';
		if (timer) {
			clearInterval(timer);
		}
	});

	/*
	addEvent(video, 'timeupdate', function() {
		setDqbfjd();
		draw();
	});
	*/

	addEvent(bfzt, 'click', function(e) {
		if (video.paused) {
			video.play();
			playVideo();
			if (!video.paused) {
				bfzt.className = 'zt';
			}
		} else {
			video.pause();
			pauseVideo();
			if(video.paused) {
				bfzt.className = 'bf';
			}
		}
		setDqbfjd();
	});

	addEvent(bfzjd, 'click', function(e) {
		var bfjdBox = bfzjd.getBoundingClientRect();
		video.currentTime = (e.clientX - bfjdBox.left) * video.duration / config.width;
		draw();
	});

	addEvent(bfzjd, 'mousedown', function(e) {
		isDown = true;
	});

	addEvent(document.body, 'mouseup', function(e) {
		isDown = false;
	});

	addEvent(bfzjd, 'mousemove', function(e) {
		if (isDown) {
			var bfjdBox = bfzjd.getBoundingClientRect();
			video.currentTime = (e.clientX - bfjdBox.left) * video.duration / config.width;
		}
	});

	addEvent(zdhcz, 'click', function(e) {
		config.width = window.innerWidth;
		config.height = window.innerHeight - 54;
		canvas.width = config.width;
		canvas.height = config.height;
		rect = getRectData();
		czDiv.style.width = config.width + 'px';
	});

	function getRectData() {
		var cw = canvas.width;
		var ch = canvas.height;
		var vw = video.videoWidth;
		var vh = video.videoHeight;
		var scale;
		if (vw <= cw && ch <= ch) {
			scale = 1;
		} else {
			var xs = vw / cw;
			var ys = vh / ch;
			scale = (xs > ys) ? xs : ys;
		}
		var w = vw / scale;
		var h = vh / scale;
		return {
			sx: (cw - w) / 2,
			sy: (ch - h) / 2,
			width: w,
			height: h
		};
	}


	function playVideo () {
		timer = setInterval(function() {
			setDqbfjd();
			draw();
		}, 20);
	}

	function pauseVideo () {
		if (timer) {
			clearInterval(timer);
		}
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.drawImage(video, rect.sx, rect.sy, rect.width, rect.height);
	}


	function setDqbfjd() {
		var w = canvas.width * video.currentTime / video.duration;
		dqbfjd.style.width = w + 'px';
		sjxx.innerText = second2Minute(video.currentTime) + ' / ' + second2Minute(video.duration);
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
})();
