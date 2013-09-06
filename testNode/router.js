function route(pathName, handle, res) {
   console.log("About to route a request for " + pathName);
   
   if (typeof handle[pathName] === 'function') {
      handle[pathName](res);
   } else {
      console.log("No request handler found for " + pathName);
      res.writeHead(404, {"Content-Type" : "text/plain"});
      res.write("404 Not found");
      res.end();
   }
}

if (typeof exports == 'undefined') {
   var exports = {};
}
exports.route = route;