let os = require('os');
const stringUtil = require('./stringUtil');

const CURRENT = {
	DEFAULT: 0,
	CODE: 1,
	LINE_CODE: 2,
	UL: 3,
	OL: 4,
	TABLE: 5,
	BLOCKQUOTE: 6
};

const regs = {
	H1: /^[\s]*[#]{1}[^#]{1}.*/,
	H2: /^[\s]*[#]{2}[^#]{1}.*/,
	H3: /^[\s]*[#]{3}[^#]{1}.*/,
	H4: /^[\s]*[#]{4}[^#]{1}.*/,
	H5: /^[\s]*[#]{5}[^#]{1}.*/,
	H6: /^[\s]*[#]{6}[^#]{1}.*/,
	HR: /^[\s]*([*]{3}||[-]{3})[\s]*$/,
	B: /^[*]{2}.+[*]{2}$/,
	I: /^\*.+\*$/,
	UL: /^[*]{1}[^*]{1}.*$/,
	OL: /^[\d]+[\.]{1}[^.]{1}.*$/,
	CODE: /^[`]{3}.*$/,
	A: /\[[^\[\]]*\]\([^\(\)]+\)/g,
	IMG: /^\s*\!\[.*\]\(.+\)\s*$/,
	TABLE: /^\|.+\|$/,
	BLOCKQUOTE: /^\>.*/,
	B_INLINE: /[*]{2}[^*]+[*]{2}/g,
	I_INLINE: /[*]{1}[^*]+[*]{1}/g,
	CODE_INLINE: /`[^`]+`/g
};

// ----------------------------------------------------------------------

let h1 = function(line) {
	let str = stringUtil.trim(line).substring(1);
	return '<h1>' + stringUtil.trim(str) + '</h1>';
};

let h2 = function(line) {
	let str = stringUtil.trim(line).substring(2);
	return '<h2>' + stringUtil.trim(str) + '</h2>';
};

let h3 = function(line) {
	let str = stringUtil.trim(line).substring(3);
	return '<h3>' + stringUtil.trim(str) + '</h3>';
};

let h4 = function(line) {
	let str = stringUtil.trim(line).substring(4);
	return '<h4>' + stringUtil.trim(str) + '</h4>';
};

let h5 = function(line) {
	let str = stringUtil.trim(line).substring(5);
	return '<h5>' + stringUtil.trim(str) + '</h5>';
};

let h6 = function(line) {
	let str = stringUtil.trim(line).substring(6);
	return '<h6>' + stringUtil.trim(str) + '</h6>';
};

let handler = function(content) {
	content = handlerJKH(content);
	content = handlerA(content);
	content = handlerB(content);
	content = handlerI(content);
	content = handlerCODE(content);
	return content;

	function handlerJKH(content) {
		let ltReg = /\</g
		let gtReg = /\>/g
		content = content.replace(ltReg, '&lt;');
		content = content.replace(gtReg, '&gt;');
		return content;
	}

	function handlerA(content) {
		let aTextReg = /\[.*\]/
		let urlReg = /\(.+\)/
		let as = content.match(regs.A);
		if (as != null && as.length > 0) {
			let contents = content.split(regs.A);
			content = ''; 
			for (let ai = 0; ai < as.length; ai++) {
				let item = as[ai];
				let text = item.match(aTextReg)[0];
				let url = item.match(urlReg)[0];
				text = stringUtil.trim(text.substring(1, text.length - 1));
				url = stringUtil.trim(url.substring(1, url.length - 1));
				let atext = '<a href="' + url + '">' + text + '</a>';
				content += contents[ai] + atext;
			}
			content += contents[contents.length - 1];
		}
		return content;
	}

	function handlerB(content) {
		let bs = content.match(regs.B_INLINE);
		if (bs != null && bs.length > 0) {
			let contents = content.split(regs.B_INLINE);
			content = '';
			for (let bi = 0; bi < bs.length; bi++) {
				let item = bs[bi];
				let text = '<b>' + stringUtil.trim(item.substring(2, item.length - 2)) + '</b>';
				content += contents[bi] + text;
			}
			content += contents[contents.length - 1];
		}
		return content;
	}

	function handlerI(content) {
		let bs = content.match(regs.I_INLINE);
		if (bs != null && bs.length > 0) {
			let contents = content.split(regs.I_INLINE);
			content = '';
			for (let bi = 0; bi < bs.length; bi++) {
				let item = bs[bi];
				let text = '<i>' + stringUtil.trim(item.substring(1, item.length - 1)) + '</i>';
				content += contents[bi] + text;
			}
			content += contents[contents.length - 1];
		}
		return content;
	}

	function handlerCODE(content) {
		let bs = content.match(regs.CODE_INLINE);
		if (bs != null && bs.length > 0) {
			let contents = content.split(regs.CODE_INLINE);
			content = '';
			for (let bi = 0; bi < bs.length; bi++) {
				let item = bs[bi];
				let text = '<code class="inline_code">' + stringUtil.trim(item.substring(1, item.length - 1)) + '</code>';
				content += contents[bi] + text;
			}
			content += contents[contents.length - 1];
		}
		return content;
	}
};

let img = function(line) {
	let alt1_index =  line.indexOf('[');
	let alt2_index =  line.indexOf(']');
	let src1_index = line.indexOf('(');
	let src2_index = line.indexOf('{');
	let p1_index = line.indexOf('{');
	let p2_index = line.indexOf('}');
	let alt = line.substring(alt1_index + 1, alt2_index);
	let src = line.substring(src1_index + 1, src2_index);
	let p = line.substring(p1_index + 1, p2_index);
	return '<img alt="' + alt + '" '+ p + ' src="' + src + '">';
}

let b = function(line) {
	let content = stringUtil.trim(line.substring(2, line.length - 2));
	return '<p><b>' + handler(content) + '</b></p>';
};

let i = function(line) {
	let content = stringUtil.trim(line.substring(1, line.length - 1));
	return '<p><i>' + handler(content) + '</i></p>';
};

let ul1 = function(line) {
	let content = stringUtil.trim(line.substring(1));
	return '<ul><li>' + handler(content) + '</li>';
};

let ul2 = function(line) {
	let content = stringUtil.trim(line.substring(1));
	return '<li>' + handler(content) + '</li>';
};

let ul3 = function(line) {
	return '</ul>';
};

let code1 = function(line) {
	let language = stringUtil.trim(line.substring(3));
	language = (language == '') ? 'none' : language;
	return '<pre class="line-numbers language-' + language + '">';
};

let code2 = function(line, preLine, nextLine) {
	let beginReg = /^[`]{3}/
	line = handler(line);
	if (beginReg.test(preLine)) {
		line = '<code>' + line;
	}
	if (stringUtil.trim(nextLine) == '```') {
		line = line + '</code>';
	}
	return line;
};

let code3 = function() {
	return '</pre>';
};

let ol1 = function(line) {
	let d = line.indexOf('.');
	let content = stringUtil.trim(line.substring(d + 1));
	return '<ol><li>' + handler(content) + '</li>';
};

let ol2 = function(line) {
	let d = line.indexOf('.');
	let content = stringUtil.trim(line.substring(d + 1));
	return '<li>' + handler(content) + '</li>';
};

let ol3 = function(line) {
	return '</ol>';
};

let table1 = function(line) {
	let beginReg = /^\|/
	let endReg = /\|$/
	let middleReg = /\|/g
	line = handler(stringUtil.trim(line));
	line = line.replace(beginReg, '<table><tr><th>');
	line = line.replace(endReg, '</th></tr>');
	line = line.replace(middleReg, '</th><th>');
	return line;
};

let table2 = function(line) {
	let beginReg = /^\|/
	let endReg = /\|$/
	let middleReg = /\|/g
	line = handler(stringUtil.trim(line));
	line = line.replace(beginReg, '<tr><td>');
	line = line.replace(endReg, '</td></tr>');
	line = line.replace(middleReg, '</td><td>');
	return line;
};

let table3 = function() {
	return '</table>';
};

let blockquote1 = function(line) {
	let content = stringUtil.trim(line.substring(1));
	return '<blockquote><p>' + content + '</p>';
};

let blockquote2 = function(line) {
	let content = stringUtil.trim(line.substring(1));
	return '<p>' + content + '</p>';
};

let blockquote3 = function() {
	return '</blockquote>';
};

let p = function(line) {
	let content = stringUtil.trim(line);
	content = handler(content);
	return '<p>' + content + '</p>';
}

// ----------------------------------------------------------------------

function isArray(o) {
	return Object.prototype.toString.call(o) == '[object Array]';
}

// ----------------------------------------------------------------------

let currentStatus = {
	status: CURRENT.DEFAULT,
	index: 0,
	line: '',
	lines: []
};

let parse = function(lineArr) {
	let datas = [];
	currentStatus.lines = lineArr;
	currentStatus.lines.forEach(function(line, index) {
		currentStatus.line = line;
		currentStatus.index = index;
		datas.push(parseLine());
	});
	return datas;
};

function parseLine() {
//	return currentStatus.line;
	if (currentStatus.status === CURRENT.DEFAULT) {
		if (regs.H1.test(currentStatus.line)) {
			return h1(currentStatus.line);
		}
		if (regs.H2.test(currentStatus.line)) {
			return h2(currentStatus.line);
		}
		if (regs.H3.test(currentStatus.line)) {
			return h3(currentStatus.line);
		}
		if (regs.H4.test(currentStatus.line)) {
			return h4(currentStatus.line);
		}
		if (regs.H5.test(currentStatus.line)) {
			return h5(currentStatus.line);
		}
		if (regs.H6.test(currentStatus.line)) {
			return h6(currentStatus.line);
		}
		if (regs.IMG.test(currentStatus.line)) {
			return img(currentStatus.line);
		}
		if (regs.B.test(currentStatus.line)) {
			return b(currentStatus.line);
		}
		if (regs.I.test(currentStatus.line)) {
			return i(currentStatus.line);
		}
		if (regs.UL.test(currentStatus.line)) {
			currentStatus.status = CURRENT.UL;
			return ul1(currentStatus.line);
		}
		if (regs.CODE.test(currentStatus.line)) {
			currentStatus.status = CURRENT.CODE;
			return code1(currentStatus.line);
		}
		if (regs.OL.test(currentStatus.line)) {
			currentStatus.status = CURRENT.OL;
			return ol1(currentStatus.line);
		}
		if (regs.TABLE.test(currentStatus.line)) {
			currentStatus.status = CURRENT.TABLE;
			return table1(currentStatus.line);
		}
		if (regs.BLOCKQUOTE.test(currentStatus.line)) {
			currentStatus.status = CURRENT.BLOCKQUOTE;
			return blockquote1(currentStatus.line);
		}
		if (stringUtil.trim(currentStatus.line) != '') {
			return p(currentStatus.line);
		}

	}
	if (currentStatus.status === CURRENT.UL) {
		if (stringUtil.trim(currentStatus.line) == '') {
			currentStatus.status = CURRENT.DEFAULT;
			return ul3();
		} else {
			return ul2(currentStatus.line);
		}
	}
	if (currentStatus.status == CURRENT.CODE) {
		if (stringUtil.trim(currentStatus.line) == '```') {
			currentStatus.status = CURRENT.DEFAULT;
			return code3();
		} else {
			return code2(currentStatus.line, currentStatus.lines[currentStatus.index - 1], currentStatus.lines[currentStatus.index + 1]);
		}
	}
	if (currentStatus.status == CURRENT.OL) {
		if (stringUtil.trim(currentStatus.line) == '') {
			currentStatus.status = CURRENT.DEFAULT;
			return ol3();
		} else {
			return ol2(currentStatus.line);
		}
	}
	if (currentStatus.status == CURRENT.TABLE) {
		if (stringUtil.trim(currentStatus.line) == '') {
			currentStatus.status = CURRENT.DEFAULT;
			return table3();
		} else {
			return table2(currentStatus.line);
		}
	}
	if (currentStatus.status == CURRENT.BLOCKQUOTE) {
		if (stringUtil.trim(currentStatus.line) == '') {
			currentStatus.status = CURRENT.DEFAULT;
			return blockquote3();
		} else {
			return blockquote2(currentStatus.line);
		}
	}
	return currentStatus.line;
}


module.exports = parse;
