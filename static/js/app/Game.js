define(["jquery", "md5"], function(
         $,        md5            ) {

    return {
      canvas : null,
      ctx : null,
      contextType : "2d",
      initCanvas : function(w,h,t,l){
        w = typeof w !== 'undefined' ? w : 100;
        h = typeof h !== 'undefined' ? h : 100;
        t = typeof t !== 'undefined' ? t : 0;
        l = typeof l !== 'undefined' ? l : 0;
        
        this.canvas = $("<canvas />")[0];
        this.canvas.height = h;
        this.canvas.width = w;
        $(this.canvas).css({height: h + "px",width: w + "px"});
        this.ctx = this.canvas.getContext("2d");
        $(document.body).append(this.canvas);
      },
      render : function(){
        this.ctx.save();
        this.ctx.fillStyle = "rgba(0,0,255,.1)";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.restore();
      }
      
    };
});
