<?php
include "config/app.php";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="format-detection"content="telephone=no, email=no" />
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="HandheldFriendly" content="true">
	<meta name="MobileOptimized" content="640">
	<meta name="screen-orientation" content="portrait">
	<meta name="x5-orientation" content="portrait">
	<meta name="full-screen" content="yes">
	<meta name="x5-fullscreen" content="true">
	<meta name="browsermode" content="application">
	<meta name="x5-page-mode" content="app">
	<meta name="msapplication-tap-highlight" content="no">
	<title><?=$websiteTitle?></title>
	<meta name="viewport" content="width=640,target-densitydpi=device-dpi,maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="<?=$cdnUrl?>assets/css/style.css<?=$version?>">
   	<script src="<?=$cdnUrl?>assets/js/libs/base.js<?=$version?>"></script>
   	<script>
		seajs.config({
			'map': [ [/^(.*\.(?:css|js))(.*)$/i, "$1<?=$version?>"] ],
			"base": '<?=$cdnUrl?>assets/js/',
		});
	</script>
	<script>
		var __version = "<?=$version?>";
		var	__cdnurl = "<?=$cdnUrl?>";
		var	__defaultWxData = {
			imgUrl : "<?=$wxData['imgUrl']?>",
			link : "<?=$wxData['link']?>",
			desc : "<?=$wxData['desc']?>",
			title : "<?=$wxData['title']?>",
			singleDesc : "<?=$wxData['singleDesc']?>"
		};

		gm.ready(function(){
	    	FastClick.attach(document.body);
	    	$(document).on("touchmove", function(e) {
	    		e.preventDefault();
	    	});
	    	$(".scroller").on("touchmove", function(e) {
	    		e.stopPropagation();
	    	});
	    	gm.setSuit();
		})
	</script>
</head>
<body>
<div class="hide">
	<img src="<?=$wxData['imgUrl']?><?=$version?>" alt="">
</div>
