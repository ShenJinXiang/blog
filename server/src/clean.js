const path = require('path');
const fsUtil = require('./fsUtil');

let clean = function() {
	fsUtil.remove(path.join(process.cwd(), '/pages'));
	fsUtil.remove(path.join(process.cwd(), 'index.html'));
};

module.exports = clean;
