/*
 * GET users listing.
 */

var users = require('../data/users');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');

module.exports = function(app) {

	app.get('/users', function(request, response) {
		response.render('users/index', {
			title : 'Users',
			users : users
		});
	});

	app.get('/users/new', notLoggedIn, function(request, response) {
		response.render('users/new', {
			title : "New User"
		});
	});

	app.get('/users/:name', loadUser, function(request, response, next) {
		response.render('users/profile', {
			title: 'User profile', 
			user: request.user
		});
	});

	app.post('/users', notLoggedIn, function(request, response) {
		if (users[request.body.username]) {
			response.send('Conflict', 409);
		} else {
			users[request.body.username] = request.body;
			response.redirect('/users');
		}
	});

	app.del('/users/:name', loadUser, restrictUserToSelf, function(request, response, next) {
		delete users[request.user.username];
		response.redirect('/users');
	});

};