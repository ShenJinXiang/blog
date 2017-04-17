const path = require('path');
const fsUtil = require('./fsUtil');

/**
 * 整个模板
 * title 标题
 * description 副标题
 * menu 菜单
 * main 主内容
 */
let index = fsUtil.readFile(path.join(__dirname, '/template/index.html'));

/**
 * 菜单
 */
let menu0 = fsUtil.readFile(path.join(__dirname, '/template/menu0.html'));
let menu1 = fsUtil.readFile(path.join(__dirname, '/template/menu1.html'));
let menu2 = fsUtil.readFile(path.join(__dirname, '/template/menu2.html'));
let menu3 = fsUtil.readFile(path.join(__dirname, '/template/menu3.html'));

/**
 * 分页
 * page
 * pagebtns
 */
let page = fsUtil.readFile(path.join(__dirname, '/template/page.html'));

/**
 * 文章
 * url
 * title
 * description
 * date
 * category
 * tags
 */
let posts = fsUtil.readFile(path.join(__dirname, '/template/posts.html'));
let post = fsUtil.readFile(path.join(__dirname, '/template/post.html'));

/**
 * 上一页、下一页按钮组
 * prePageBtn
 * nextPageBtn
 */
let pageBtns = fsUtil.readFile(path.join(__dirname, '/template/pageBtns.html'));

/**
 * 上一页或下一页按钮
 * topage
 * href
 * pageText
 */
let pageBtn = fsUtil.readFile(path.join(__dirname, '/template/pageBtn.html'));

/**
 * 归档页面主体页面
 * archives
 */
let archives = fsUtil.readFile(path.join(__dirname, '/template/archives.html'));

/**
 * 归档标题 带年
 * year
 * archiveList
 */
let archiveTitle = fsUtil.readFile(path.join(__dirname, '/template/archiveTitle.html'));

/**
 * 归档页面 每条记录
 * href
 * title
 * monthday
 */
let archive = fsUtil.readFile(path.join(__dirname, '/template/archive.html'));


/**
 * demo主体页面
 * demoList
 */
let demoList = fsUtil.readFile(path.join(__dirname, '/template/demoList.html'));

/**
 * 评论
 * id 
 * title
 * url
 */
let pinglun = fsUtil.readFile(path.join(__dirname, '/template/pinglun.html'));

exports.index = index;
exports.menu0 = menu0;
exports.menu1 = menu1;
exports.menu2 = menu2;
exports.menu3 = menu3;
exports.page = page;
exports.posts = posts;
exports.post = post;
exports.pageBtns = pageBtns;
exports.pageBtn = pageBtn;

exports.archives = archives;
exports.archiveTitle = archiveTitle;
exports.archive = archive;

exports.demoList = demoList;
exports.pinglun = pinglun;
