define(["jquery", "md5", "Game", "Editor"], function(
         $,        md5,   Game,   Editor ) {

//Game.initCanvas();
//Game.render();

//$("#image_uploader").hide();
//$("#image_uploader").hide();
	Editor.init();
	Editor.addNode();
	console.log($(".bone_menu_item"));
	window.onmouseup = function(){
		$(".bone_menu_item").hide();
		$(".bone_node").each(function(index,el){el.dragging = false;});
	};
	$(window).mousemove(function(e){
		//console.log("moving")
		$(".bone_node").each(function(index,el){
			//console.log(el);
			if(el.dragging) {
				console.log($("#bone_div")[0].offsetTop);
				var x = e.clientX;
				var y = e.clientY - $("#bone_maker")[0].offsetTop;
				console.log(x,y);
				$(el).css({left:x,top:y});
			}
		});
	});
});