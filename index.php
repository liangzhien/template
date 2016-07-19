<?php include "include/header.php"; ?>
<div class="wrap hide">
	<div class="pages">
		<section class="page index">
			<div class="bg" ></div>
		</section>
	</div>
	<div class="modals hide">
		<div class="modal modal_share hide">

		</div>
	</div>
</div>
<script>
	var __initPage = "index";
	seajs.use("index",function(_my){

		wx.ready(function(){
			wxData.share();
		});
	});
</script>
<?php include "include/footer.php"; ?>
