let getDateStr = function (date, patter) {
	let year = date.getFullYear();
	let month = getStr(date.getMonth() + 1);
	let d = getStr(date.getDate());
	let hour = getStr(date.getHours());
	let minute = getStr(date.getMinutes());
	let second = getStr(date.getSeconds());
	let millisecond = date.getMilliseconds();
	millisecond = (millisecond > 99) ? ('' + millisecond) : ((millisecond > 9) ? ('0' + millisecond) : ('00' + millisecond));
	if (!!patter) {
		let str = 
			patter.replace('yyyy', year)
						.replace('MM', month)
						.replace('dd', d)
						.replace('HH', hour)
						.replace('mm', minute)
						.replace('ss', second)
						.replace('SSS', millisecond);
		return str;
	}
	return year + '-' + month + '-' + d;

	function getStr(n) {
		return (n > 9) ? ('' + n) : ('0' + n);
	}
}

let getFirstDate = function() {
	let d = new Date();
	d.setDate(1);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return d;
};

let getLastDate = function() {
	let d = new Date();
	d.setMonth(d.getMonth() + 1);
	d.setDate(0);
	d.setHours(23);
	d.setMinutes(59);
	d.setSeconds(59);
	d.setMilliseconds(999);
	return d;
};

let getFirstDateStr = function(patter) {
	return getDateStr(getFirstDate(), patter);
};

let getLastDateStr = function(patter) {
	return getDateStr(getLastDate(), patter);
};

module.exports = {
	getDateStr: getDateStr,
	getFirstDate: getFirstDate,
	getFirstDateStr: getFirstDateStr,
	getLastDate: getLastDate,
	getLastDateStr: getLastDateStr
};
