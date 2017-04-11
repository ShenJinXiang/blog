let getParams = function(str) {
	let reg = /\#[\w]+\#/g
	return str.match(reg);
};

let replace = function(str, obj) {
	let params = getParams(str);
	if(!!params || params.length > 0) {
		params.forEach(function(item) {
			let content = obj[item.substring(1, item.length - 1)];
			str = str.replace(item, content);
		});
	}
	return str;
};

let trim = function(str) {
	let reg = /^\s+|\s+$/g
	return str.replace(reg, '');
};

exports.getParams = getParams;
exports.replace = replace;
exports.trim = trim;
