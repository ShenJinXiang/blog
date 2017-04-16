const os = require('os');
const dateUtil = require('./dateUtil');
const stringUtil = require('./stringUtil');
const config = require('../config');
const parse = require('./parse');

/**
 * id
 * title - 标题
 * dateStr - 日期
 * category - 分类
 * tags - 标签
 */
function Post(id, title, dateStr, category, tags, description, url) {
	this.id = id;
	this.title = title;
	this.category = category;
	this.tags = tags;
	this.description = description;
	this.url = url;
}

Post.prototype.getId = function() {
	return this.id;
};
Post.prototype.setId = function(id) {
	this.id = id;
};

Post.prototype.getTitle = function () {
	return this.title;
};
Post.prototype.setTitle = function (title) {
	this.title = title;
};

Post.prototype.getType = function() {
	return this.type;
};

Post.prototype.setType = function(type) {
	this.type = type;
};

Post.prototype.setDate = function (dateStr) {
	let reg = /\d+/g
	let str = dateStr.match(reg).join('');
	if(str.length < 8) {
		throw new Err('日期格式错误');
	}
	let year = str.substring(0, 4);
	let month = parseInt(str.substring(4, 6));
	let day = parseInt(str.substring(6, 8));
	let d = new Date();
	d.setFullYear(year);
	d.setMonth(month - 1);
	d.setDate(day);
	this.date = d;
};

Post.prototype.getDateStr = function () {
	return dateUtil.getDateStr(this.date);
};

Post.prototype.getDateYear = function () {
	return dateUtil.getDateStr(this.date, 'yyyy');
};

Post.prototype.getMonthDay = function() {
	return dateUtil.getDateStr(this.date, 'MM-dd');
};

Post.prototype.getMonth = function() {
	return dateUtil.getDateStr(this.date, 'MM');
};

Post.prototype.getDay = function() {
	return dateUtil.getDateStr(this.date, 'dd');
};

Post.prototype.setCategory = function (category) {
	this.category = category;
};

Post.prototype.getCategory = function () {
	return this.category;
};

Post.prototype.setTags = function (tags) {
	this.tags = tags;
};

Post.prototype.getTags = function() {
	return this.tags;
};

Post.prototype.setDescription = function (description) {
	this.description = description;
};

Post.prototype.getDescription = function () {
	return this.description;
};

Post.prototype.setUrl = function (url) {
	this.url = url;
};

Post.prototype.getUrl = function () {
	let dirpath = config.paths.post.path;
	let _url = stringUtil.replace(dirpath, {
		category: this.getCategory(),
		year: this.getDateYear(),
		month: this.getMonth(),
		day: this.getDay(),
		title: this.getTitle()
	});
	return _url;
};

Post.prototype.setSource = function(source) {
	this.source = source;
};

Post.prototype.getSource = function() {
	return this.source;
};

Post.prototype.getContent = function() {
	//return this.source.join(os.EOL);
	if (this.type === '.md') {
		return parse(this.source).join(os.EOL);
	}
	return this.source.join(os.EOL);
};

module.exports = Post;
