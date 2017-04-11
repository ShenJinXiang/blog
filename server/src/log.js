const dateUtil = require('./dateUtil');

let log = function(info) {
	let dateStr = dateUtil.getDateStr(new Date(), 'yyyy-MM-dd HH:mm:ss, SSS');
	console.log(`[${dateStr}] ${info}`);
}

module.exports = log;
