const path = require('path');
const config = require('../config');
const fsUtil = require('./fsUtil');
const stringUtil = require('./stringUtil');
const template = require('./template');

/**
 * 分页页面
 */
let pagesHtml = function(postList) {
	let index = template.index;
	let menu1 = template.menu1;
	let page = template.page;
	let posts = template.posts;
	let pageBtns = template.pageBtns;
	let pageBtn = template.pageBtn;

	// 计算总页数
	let totalPage = Math.ceil(postList.length / config.pageSize);

	for (let i = 1; i <= totalPage; i++) {
		pageHtml(i);
	}

	function pageHtml(pageNum) {
		// 文件路径
		let dirpath;
		if (pageNum === 1) {
			dirpath = path.join(process.cwd(), config.paths.home.path);
		} else {
			let _path = stringUtil.replace(config.paths.page.path, {pageNum: pageNum});
			dirpath = path.join(process.cwd(), _path);
		}
		// 当前页文章列表
		let postArr = postList.slice((pageNum - 1) * config.pageSize, pageNum * config.pageSize);
		let postArrHtml = [];
		postArr.forEach(function(post) {
			let tagsHtml = [];
			let tags = post.tags;
			tags.forEach(function(tag) {
				let tagHref = stringUtil.replace(config.paths.tags.path, {tag: tag});
				tagsHtml.push(`<a href='${tagHref}'>${tag}</a>`);
			});
			let postsHtml = stringUtil.replace(posts, {
				title: post.title,
				url: post.getUrl(),
				description: post.description,
				date: post.getDateStr(),
				category: post.category,
				tags: tagsHtml.join(' ')
			});
			postArrHtml.push(postsHtml);
		});

		// 文章列表底部的上一下、下一页按钮
		let preBtn = stringUtil.replace(pageBtn, {
			topage: 'pre',
			href: ((pageNum == 2) ? config.paths.home.path : (stringUtil.replace(config.paths.page.path, {pageNum: pageNum - 1}))),
			pageText: '上一页'
		});
		let nextBtn = stringUtil.replace(pageBtn, {
			topage: 'next',
			href: stringUtil.replace(config.paths.page.path, {pageNum: pageNum + 1}),
			pageText: '下一页'
		}); 
		preBtn = (pageNum === 1) ? '' : preBtn;
		nextBtn = (pageNum === totalPage) ? '' : nextBtn;
		let pageBtnsHtml = stringUtil.replace(pageBtns, {prePageBtn: preBtn, nextPageBtn: nextBtn});

		// 生成整个页面的主体内容
		let pageContent = stringUtil.replace(page, {page: postArrHtml.join(''), pagebtns: pageBtnsHtml});
		let html = stringUtil.replace(index, {title: config.title, description: config.description, menu: menu1, main: pageContent});
		fsUtil.writeFile(dirpath, html);
	}
};

/**
 * 归档页面
 */
let archivesHtml = function(postList) {
	let index = template.index;
	let menu2 = template.menu2;

	let archivesContent = getArchives(postList);
	let html = stringUtil.replace(index, {title: config.title, description: config.description, menu: menu2, main: archivesContent});
	let dirpath = path.join(process.cwd(), config.paths.archives.path);
	fsUtil.writeFile(dirpath, html);
};


function getArchives(postList) {
	let archives = template.archives;
	let archiveTitle = template.archiveTitle;
	let archive= template.archive;
	let obj = {
		year: [],
		data: {}
	};
	postList.forEach(function(post, i) {
		let year = post.getDateYear();
		if (obj.year.indexOf(year) == -1) {
			obj.year.push(year);
			obj.data[year] = [];
		} 
		obj.data[year].push(i);
	});

	let archiveTitleList = [];
	obj.year.forEach(function(year){
		let archiveList = [];
		obj.data[year].forEach(function(item) {
			let itemHtml = stringUtil.replace(archive, {
				href: postList[item].getUrl(),
				title: postList[item].title,
				monthday: postList[item].getMonthDay()
			});
			archiveList.push(itemHtml);
		});
		let archiveTitleHtml = stringUtil.replace(archiveTitle, {year: year,archiveList: archiveList.join('')});
		archiveTitleList.push(archiveTitleHtml);
	});
	let archivesContent = stringUtil.replace(archives, {archives: archiveTitleList.join('')});

	return archivesContent;
}

/**
 * 标签页面
 */
let tagsHtml = function(postList) {
	let index = template.index;
	let menu0 = template.menu0;

	let obj = {
		tags: [],
		data: {}
	};
	postList.forEach(function(post, i) {
		let tags = post.getTags();
		tags.forEach(function(tag) {
			if (obj.tags.indexOf(tag) == -1) {
				obj.tags.push(tag);
				obj.data[tag] = [];
			}
			obj.data[tag].push(post);
		});
	});


	obj.tags.forEach(function(tag) {
		let dirpath = path.join(process.cwd(), stringUtil.replace(config.paths.tags.path, {tag: tag}));
		let archivesContent = getArchives(obj.data[tag]);
		let html = stringUtil.replace(index, {title: config.title, description: config.description, menu: menu0, main: archivesContent});
		fsUtil.writeFile(dirpath, html);
	});
};

/*
 * 分类页面
 */
let categoryHtml = function(postList) {
	let index = template.index;
	let menu0 = template.menu0;

	let obj = {
		category: [],
		data: {}
	};
	postList.forEach(function(post, i) {
		let category = post.getCategory();
		if (obj.category.indexOf(category) == -1) {
			obj.category.push(category);
			obj.data[category] = [];
		}
		obj.data[category].push(post);
	});


	obj.category.forEach(function(category) {
		let dirpath = path.join(process.cwd(), stringUtil.replace(config.paths.category.path, {category: category}));
		let archivesContent = getArchives(obj.data[category]);
		let html = stringUtil.replace(index, {title: config.title, description: config.description, menu: menu0, main: archivesContent});
		fsUtil.writeFile(dirpath, html);
	});
};

let demoHtml = function() {
	let index = template.index;
	let menu3 = template.menu3;
	let demoList = template.demoList;
	let archive= template.archive;

	let demoArr = [];
	config.demo.forEach(function(item) {
		let demo = stringUtil.replace(archive, {href: item.url, title: item.title, monthday: item.date});
		demoArr.push(demo);
	});
	let demoContent = stringUtil.replace(demoList, {demoList: demoArr.join(' ')});
	let dirpath = path.join(process.cwd(), config.paths.demo.path);
	let html = stringUtil.replace(index, {title: config.title, description: config.description, menu: menu3, main: demoContent});
	fsUtil.writeFile(dirpath, html);
};

let postsHtml = function(postList) {
	let index = template.index;
	let menu0 = template.menu0;
	let page = template.page;
	let postH = template.post;
	let pageBtns = template.pageBtns;
	let pageBtn = template.pageBtn;
	
	postList.forEach(function(item, i) {
		let tagsHtml = [];
		let tags = item.tags;
		tags.forEach(function(tag) {
			let tagHref = stringUtil.replace(config.paths.tags.path, {tag: tag});
			tagsHtml.push(`<a href='${tagHref}'>${tag}</a>`);
		});
		let postContent = stringUtil.replace(postH, {
			url: item.getUrl(),
			title: item.getTitle(),
			description: item.getContent(),
			date: item.getDateStr(),
			category: item.getCategory(),
			tags: tagsHtml.join(' ')
		});
		let preBtn = '';
		if(i === 0) {
			preBtn = '';
		} else {
			let prePost = postList[i - 1];
			preBtn = stringUtil.replace(pageBtn, {
				topage: 'pre',
				href: prePost.getUrl(),
				pageText: '上一篇'
			});
		}
		let nextBtn = '';
		if (i === postList.length - 1) {
			nextBen = '';
		} else {
			let nextPost = postList[i + 1];
			nextBtn = stringUtil.replace(pageBtn, {
				topage: 'next',
				href: nextPost.getUrl(),
				pageText: '下一篇'
			});
		}
		let pageBtnsContent = stringUtil.replace(pageBtns, {prePageBtn: preBtn, nextPageBtn: nextBtn});
		let pageContent = stringUtil.replace(page, {page: postContent, pagebtns: pageBtnsContent});
		let html = stringUtil.replace(index, {
				title: config.title,
				description: config.description,
				menu: menu0,
				main: pageContent
		});
		let dirpath = path.join(process.cwd(), stringUtil.replace(config.paths.post.path, {
			category: item.getCategory(),
			year: item.getDateYear(),
			month: item.getMonth(),
			day: item.getDay(),
			title: item.getTitle()
		}));
		fsUtil.writeFile(dirpath, html);
	});
};

exports.pagesHtml = pagesHtml;
exports.archivesHtml = archivesHtml;
exports.tagsHtml = tagsHtml;
exports.categoryHtml = categoryHtml;
exports.demoHtml = demoHtml;
exports.postsHtml = postsHtml;
