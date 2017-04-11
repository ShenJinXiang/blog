const du = require('./dateUtil');
const fsUtil = require('./fsUtil');
const path = require('path');
const config = require('../config');
/*
console.log(du.getFirstDateStr());
console.log(du.getFirstDateStr('yyyy-MM-dd HH:mm:ss SSS'));
console.log(du.getLastDateStr());
console.log(du.getLastDateStr('yyyy-MM-dd HH:mm:ss SSS'));
let str = '今天是：' + du.getDateStr(new Date()) + '这个月第一秒是：' + du.getFirstDateStr() + '这个月最后一秒是：' + du.getLastDateStr()

fsUtil.writeFile(path.join(__dirname, '/aaa/bbb/ccc/ddd'), str);
console.log(config);
var a = 2;
function fun() {
	console.log(this.a);
}
var o = {
	a: 3,
	fun: fun
};
var p = {
	a: 4
};

o.fun();
(p.fun = o.fun)();
p.fun();
function fn1() {
	fn2();
}

function fn2() {
	console.log(this);
}
fn1();
fn2();
*/

//let str = "/pages/_category/#year#/#month#/#day#/#title#/index.html";
/*
let str = "/pages/_category/${year}/${month}/${day}/${title}/index.html";
let reg = /\#[\w]+\#/g

let p= path.join(process.cwd(), `${str}`);
console.log(p);
*/

/*
let obj = {
	category: 'java',
	year: '2017',
	month: '04',
	day: '12',
	title: '一个好人'
};
let str = '今天是：' + du.getDateStr(new Date()) + '这个月第一秒是：' + du.getFirstDateStr('yyyy-MM-dd HH:mm:ss SSS') + '这个月最后一秒是：' + du.getLastDateStr('yyyy-MM-dd HH:mm:ss SSS');
const config = require('../config');
let p = config.paths.post.path;
console.log(p);
let reg = /\#[\w]+\#/g
let params = p.match(reg);
params.forEach(function(item){
	let parm = item.substring(1, item.length - 1);
	p = p.replace(item, obj[parm]);
});
fsUtil.writeFile(path.join(process.cwd(), p), str);
*/
/*
let content = fsUtil.readFile(path.join(process.cwd(), '/server/src/template/page.html'));
console.log(content);
const su = require('./stringUtil');
const log = require('./log');

let obj = {
	category: 'java',
	year: '2017',
	month: '04',
	day: '12',
	title: '一个好人',
	page: 'sdfsdf水淀粉'
};
let p = config.paths.post.path;
log(p);
p = su.replace(p, obj);
log(p);
let content = fsUtil.readFile(path.join(process.cwd(), '/server/src/template/page.html'));
log(content);
content = su.replace(content, obj);
log(content);
*/
const html = require('./html');
let content = html.indexHtml();
console.log(content);
