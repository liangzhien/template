<?php include "include/header.php"; ?>
<div class="wrap hide">
	<div class="pages">
		<section class="page index">
			<div class="bg" data-animation="fadeIn"></div>
		</section>
	</div>
	<div class="modals hide">
		<section class="modal modal_example hide">
			<div class="modal_close modal_close_default">&times;</div>
		</section>
	</div>
</div>
<script>
	var __initPage = "index";
	seajs.use("index",function(_my){

		// GM.modal.show("example");
		// GM.msg.show("版本",1000,function(){});

		wx.ready(function(){
			wxData.share();
		});
	});
</script>
<?php include "include/footer.php"; ?>
