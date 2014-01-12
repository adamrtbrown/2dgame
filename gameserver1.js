var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , crypto = require('crypto')
  , url = require('url')

app.listen(80);

var gSessions = [];
var gLetters = [];
var gValidPathParts = {
  'js':{path:"/static",ct:"application/x-javascript"},
  'html':{path:"/static",ct:"text/html"},
  'css':{path:"/static",ct:"text/css"}
  };
for(var a = 65;a <= 90;a++) gLetters.push(String.fromCharCode(a));

function handler (req, res) {
  var parsed = url.parse(req.url);
  var requeststuff = "";
  for(var a in parsed) requeststuff += "<br />" + a+" : "+parsed[a];
  console.log("Path:*" + parsed.pathname + "*");
  if(parsed.pathname == "/") parsed.pathname = "/index.html";
  var pathparts = parsed.pathname.split(".");
  if(pathparts.length > 1 || parsed.pathname == ""){
    var pp = gValidPathParts[pathparts[pathparts.length - 1]];
    if(pp){
      gContentType = pp.ct;
      console.log("Serving: "+__dirname + pp.path + parsed.pathname)
      var f = fs.readFile(__dirname + pp.path + parsed.pathname,
        function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + parsed.pathname + '<br />');
          }
          
          var session = manageSession(req);
          // To Write a Cookie
          res.writeHead(200, {
            'Set-Cookie': 'nsession=' + session.id,
            'Content-Type': pp.ct
          });
          //res.writeHead(200);
          
          res.end(data);
        });
        
    }
  } else {
    res.writeHead(500,{"Content-Type": 'text/html'});
    return res.end('Not found.<br />');
  }
}

function manageSession(request){
  var cookies = {};
  request.headers.cookie && request.headers.cookie.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
  });
  var sessionId = md5(gLetters[Math.floor(Math.random() * 26).toFixed()] +(new Date().getTime()) + gLetters[Math.floor(Math.random() * 26).toFixed()]);
  gSessions[sessionId] = {};
  var session = cookies['nsession'] || false;
  if(session){
    if(gSessions[session]){
       gSessions[session].isNew = false;
       for(var a in gSessions[session]){
         gSessions[sessionId][a] = gSessions[session][a];
       }
       gSessions[sessionId].id = sessionId;
       delete gSessions[session];
       return gSessions[sessionId];
     }
  } 
  gSessions[sessionId] = {isNew:true,id:sessionId};
  return gSessions[sessionId];
  
  
}
function md5(inp){
  return crypto.createHash('md5').update(inp).digest('hex');
}
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});