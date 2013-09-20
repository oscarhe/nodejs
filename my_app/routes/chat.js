/**
 * Chat route
 */

module.exports = function(app, io) {	
	app.get('/chat', function(request, response) {
		response.render('tpl/chat');
	});
	
	io.sockets.on('connection', function(socket) {
		socket.emit('message', {
			message: 'Welcome to the chat'
		});
		socket.on('send', function(data) {
			io.sockets.emit('message', data);
		});
	});
	
};