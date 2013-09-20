/**
 * New node file
 */

function notLoggedIn(request, response, next) {
	if(request.session.user) {
		response.send('Unauthorized', 401);
	} else {
		next();
	}
}

module.exports = notLoggedIn;