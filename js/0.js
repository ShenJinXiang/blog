$(function() {
	initPage();
});

function initPage() {
	initHeader();
	initSideBar();
	//initContent();
}

function initHeader() {
	$("#logo").text(config.logo.title);
	$("#logo").attr("href", config.ctx + config.logo.url);

	$("#description").text(config.description);

	$("#nav-menu").empty();
	for(var i = 0; i < config.menu.length; i++) {
		var $a = $("<a>" + config.menu[i].title+ "</a>");
		$a.attr("href", config.ctx + config.menu[i].url);
		if(config.menu[i].current) {
			$a.addClass("current");
		}
		$("#nav-menu").append($a);
	}
}


function initSideBar() {
	showCategoryList();
	showTagList();
	//showLastPostList();
}

function showCategoryList() {
	var cate = [];
	var temp = {};
	for(var i = 0; i < config.postList.length; i++) {
		temp[config.postList[i].category] = 1;
	}
	for(c in temp) {
		if(temp.hasOwnProperty(c)) {
			cate.push(c);
		}
	}
	$("#categoryList").empty();
	for(var ci = 0; ci < cate.length; ci++) {
		var _li = "<li class='category-list-item'><a class='category-list-link' href=\"javascript:void(0);\">" + cate[ci] + "</a></li>";
		$("#categoryList").append($(_li));
	}

}


function showTagList() {
	var tags = [];
	var temp = {};
	for(var i = 0; i < config.postList.length; i++) {
		for(var j = 0; j < config.postList[i].tags.length; j++) {
			temp[config.postList[i].tags[j]] = 1;
		}
	}
	for(t in temp) {
		if(temp.hasOwnProperty(t)) {
			tags.push(t);
		}
	}
	
	$("#tagList").empty();
	for(var ti = 0; ti < tags.length; ti++) {
		var _a = "<a href=\"javascript:void(0);\">" + tags[ti] + "</a>";
		$("#tagList").append($(_a));
	}
}
