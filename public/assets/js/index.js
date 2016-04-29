define(function(require, exports, module) {
	// require("common");

	var imgArr = [];
	var loading = $(".loading"),
		loadingData = $(".loading_data");

	$("img").each(function() {
		imgArr.push($(this).attr("src"));
	});

	$("div,a").each(function() {
		var _bg = $(this).css("background-image");
		if (_bg.match(/url\((.*)\)/)) {
			imgArr.push(_bg.match(/url\((.*)\)/)[1].replace('"', "").replace('"', ""));
		}
	});

	function loadProcess(_per) {
		loadingData.html(_per + "%");
	}

	function loadComplete(_imgs) {
		loading.remove();
		gm.animate.list(".wrap").removeClass("hide");
		gm.page.show(__initPage);
	}

	gm.loadImg(imgArr, loadComplete, loadProcess);

	function initIndex() {
	}

});
