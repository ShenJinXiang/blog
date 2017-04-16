const os = require('os');
const fsUtil = require('./fsUtil');
const parse = require('./parse');

let lines = fsUtil.readLines('/Users/shenjinxiang/Documents/blog/server/src/test.md');
console.log(lines);
let datas = parse(lines);
console.log('------');
console.log(datas.join(os.EOL));
