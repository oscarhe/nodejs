var http = require('http');
var url = require('url');

function start(route, handle) {
   http.createServer(function(req, res) {
      var pathName = url.parse(req.url).pathname;
      console.log("Request for " + pathName + " received");
      
      route(pathName, handle, res);
   }).listen(8000);
   
   console.log("Server has started");
}

if (typeof exports == 'undefined') {
   var exports = {};
}
exports.start = start;