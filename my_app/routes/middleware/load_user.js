/**
 * Load user middleware
 */

var users = require('../../data/users');

function loadUser(request, response, next) {
	var user = request.user = users[request.params.name];
	
	if(!user) {
		response.send('Not found', 404);
	} else {
		next();
	}
}

module.exports = loadUser;