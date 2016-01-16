define(function(require, exports, module) {
	require("common");
	var loadImg = require("http://qcdn.igumo.cc/libs/components/loadImg.js");

	var imgArr = [];
	var loading = $(".loading"),
		loadingData = $(".loading_data");

	$("div,a").each(function() {
		var _bg = $(this).css("background-image");
		if (_bg.match(/url\((.*)\)/)) {
			imgArr.push(_bg.match(/url\((.*)\)/)[1].replace('"', "").replace('"', ""));
		}
	});

	function loadComplete(_imgs) {
		loading.remove();
		gm.animate.list(".wrap").removeClass("hide");
		initIndex();
	}

	function loadProcess(_per) {
		loadingData.html(_per + "%");
	}

	loadImg(imgArr, loadComplete, loadProcess);

	function initIndex() {

	}

});
