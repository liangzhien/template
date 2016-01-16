define(function(require, exports, module) {
	require("http://qcdn.igumo.cc/libs/fastclick/fastclick.js");
	window.gm = require("http://qcdn.igumo.cc/libs/gm/1.0.0/gm.js");

	FastClick.attach(document.body);

	gm.setScale(1038);

	$(document).on("touchmove", function(e) {
		e.preventDefault();
	});
});
