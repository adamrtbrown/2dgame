require.config({
    paths: {
        jquery: 'lib/jquery-1.10.2.min',
        md5 : 'lib/md5-min'
    }
});

requirejs(["app/main"]);

function init(){
  Game.setup();
}
var Game = {
  canvas : null,
  c : null,
  dimensions : {w:0,h:0},
  setup : function(){
    this.c = this.getCanvasCtx();
    this.canvas = this.c.canvas;
  },
  getCanvasCtx : function(){
    var c = $("canvas")[0];
    var ct = c.getContext("2d");
    c.height = this.dimensions.h;
    c.width = this.dimensions.w;
    ct.canvas = c;
    return ct;
  }
}

document.ready(init);
