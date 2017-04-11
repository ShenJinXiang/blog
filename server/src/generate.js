const ap = require('./asPost');
const html = require('./html');

let generate = function() {
	let posts = ap.posts();

	posts.sort(function(post1, post2) {
		return post1.id > post2.id;
	});

	html.postsHtml(posts);
	html.pagesHtml(posts);
	html.archivesHtml(posts);
	html.tagsHtml(posts);
	html.categoryHtml(posts);
	html.demoHtml();
};

module.exports = generate;
