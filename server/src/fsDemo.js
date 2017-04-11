const path = require('path');
const fsUtil = require('./fsUtil');
const Post = require('./Post');
const asPost = require('./asPost');
const clean = require('./clean');

// console.log(asPost.fileList());
/*
let content = fsUtil.readFile(path.join(process.cwd(), '/src/posts/001.md'));
let arr = content.split('\n');
console.log(arr);
console.log(arr.length);
*/

clean.remove('pages');
