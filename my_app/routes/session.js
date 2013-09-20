/**
 * Session Routes
 */

var users = require('../data/users');
var notLoggedIn = require('./middleware/not_logged_in');

module.exports = function(app) {
	
	app.get('/session/new', notLoggedIn, function(request, response) {
		response.render('session/new', {title: "Log in"});
	});
	
	app.get('/session/:name', function(request, response) {
		response.render('session/user', {session: request.session});
	});
	
	app.post('/session', notLoggedIn, function(request, response) {
		if(users[request.body.username] && users[request.body.username].password === request.body.password) {
			request.session.user = users[request.body.username];
			response.redirect('/session/' + request.body.username);
		} else {
			response.redirect('/session/' + request.body.username);
		}
	});
	
	app.del('/session', function(request, response, next) {
		request.session.destroy();
		response.redirect('/users');
	});
};
