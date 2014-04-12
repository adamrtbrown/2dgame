define(["jquery", "md5"], function(
         $,        md5            ) {

    return {
    	nodeTemplate : null,
    	init : function(){
    		this.nodeTemplate = $(".bone_node")[0];
			$(this.nodeTemplate).remove();
		},
		addNode : function(){
			newNode = this.nodeTemplate.cloneNode(true);
			$(".node_menu.bone_menu_item",newNode).hide();
			$(".node_menu",newNode).click(
				function(e){
					console.log("show",e);
					$(".bone_menu_item",this).show();
					$(".bone_menu_item",this)[0].focus();
				}
			);
			$(".bone_menu_item",newNode).blur(function(){console.log("blur");$(".bone_menu_item",newNode).hide();});
			$(".bone_menu_item",newNode).click(function(e){e.originalEvent.cancelBubble = true;console.log("click");$(".bone_menu_item").hide();});
			$("#bone_div").append(newNode);
			newNode.onmousedown = function(){console.log("dragging");this.dragging = true;};
    	}
    };
});