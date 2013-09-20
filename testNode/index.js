var server = require('./practice/testNode/server');
var router = require('./practice/testNode/router');
var requestHandlers = require('./practice/testNode/requestHandlers');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);