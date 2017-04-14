const os = require('os');
const path = require('path');
const fsUtil = require('./fsUtil');
const stringUtil = require('./stringUtil');
const Post = require('./Post');
const config = require('../config');

let fileList = function() {
	let fileArr = fsUtil.readdir(path.join(process.cwd(), config.src));
	let reg = /(.md)$/
	fileArr = fileArr.filter(function(item) {
		return reg.test(item);
	});
	return fileArr;
};

let asPost = function(file) {
	let post = new Post();
	let filePath = path.join(process.cwd(), config.src, file);
	let lines = fsUtil.readLines(filePath);

	let headIndex = lines.indexOf('------');
	/*
	if (os.type() == 'Windows_NT') {
		headIndex = lines.indexOf('------\r');
	}
	*/
	let headerArr = lines.slice(0, headIndex);
	let bodyArr = lines.slice(headIndex + 1);
	parseHeaderArr(headerArr);
	parseBodyArr(bodyArr);
	return post;

	function parseHeaderArr(arr) {
		arr.forEach(function(item) {
			let index = item.indexOf(':');
			let key = stringUtil.trim(item.substring(0, index));
			let val = stringUtil.trim(item.substring(index + 1, item.length));
			if(key === 'id') {
				post.setId(val);
			}
			if (key === 'title') {
				post.setTitle(val);
			}
			if (key === 'category') {
				post.setCategory(val);
			}
			if (key === 'date') {
				post.setDate(val);
			}
			if (key === 'tags') {
				let tags = val.split(',');
				tags = tags.filter(function(tag) {
					return !!stringUtil.trim(tag);
				});
				tags = tags.map(function(tag) {
					return stringUtil.trim(tag);
				});
				post.setTags(tags);
			}
			if (key === 'description') {
				post.setDescription(val);
			}
		});
	}

	function parseBodyArr(arr) {
		post.setSource(arr);
	}
};

let posts = function() {
	let fileArr = fileList();
	let postArr = [];
	fileArr.forEach(function(file) {
		postArr.push(asPost(file));
	});
	return postArr;
};

exports.fileList = fileList;
exports.asPost = asPost;
exports.posts = posts;
