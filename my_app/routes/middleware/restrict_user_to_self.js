/**
 * Restrict user to self middleware
 */

function restrictUserToSelf(request, response, next) {
	if(!request.session.user || req.session.user.username !== request.user.username) {
		response.send('Unauthorized', 404);
	} else {
		next();
	}
}

module.exports = restrictUserToSelf;