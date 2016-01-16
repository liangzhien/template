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
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script src="http://qcdn.igumo.cc/libs/zepto.min.js"></script>
	<script src="http://qcdn.igumo.cc/libs/core.min.js"></script>
   	<script src="<?=$cdnUrl?>assets/js/sea.js<?=$version?>"></script>
   	<script>
		seajs.config({ 'map': [ [/^(.*\.(?:css|js))(.*)$/i, "$1<?=$version?>"] ] });
	</script>
	<script>
		var _version = "<?=$version?>";
		var	_cdnurl = "<?=$cdnUrl?>";
		var	_path_prefix = _cdnurl + "dist/";
		var	_defaultWxData = {
			imgUrl : "<?=$wxData['imgUrl']?>",
			link : "<?=$wxData['link']?>",
			desc : "<?=$wxData['desc']?>",
			title : "<?=$wxData['title']?>",
			singleDesc : "<?=$wxData['singleDesc']?>"
		};
	</script>
</head>
<body>
<div class="hide">
	<img src="<?=$wxData['imgUrl']?><?=$version?>" alt="">
</div>
