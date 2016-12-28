define(function(require, exports, module) {
	// require("plugin/howler.min");

	var siteImgArr = [],
		loadingBox = $(".loading"),
		loadingImgArr = [],
		loadingData = $(".loading_data");

	$("img").each(function() {
		siteImgArr.push($(this).attr("src"));
	});

	$("div,a").each(function() {
		var _bg = $(this).css("background-image");
		if (_bg.match(/url\((.*)\)/)) {
			siteImgArr.push(_bg.match(/url\((.*)\)/)[1].replace('"', "").replace('"', ""));
		}
	});

	loadingBox.find("img").each(function() {
		siteImgArr.push($(this).attr("src"));
	});

	loadingBox.find("div,a").each(function() {
		var _bg = $(this).css("background-image");
		if (_bg.match(/url\((.*)\)/)) {
			loadingImgArr.push(_bg.match(/url\((.*)\)/)[1].replace('"', "").replace('"', ""));
		}
	});

	function loadProcess(_per) {
		loadingData.html(_per + "%");
	}

	function loadComplete(_imgs) {
		loadingBox.addClass("hide");
		gm.animate.list(".wrap").removeClass("hide");
		gm.page.show(__initPage);
		gm.loadend();
	}

	gm.loadImg(loadingImgArr, function(){
		gm.loadImg(siteImgArr, loadComplete, loadProcess);
	});

});
