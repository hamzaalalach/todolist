var express = require('express'),
	router = express.Router();
router.get('/', ensureAuthenticated, function(req, res) {
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}
module.exports = router;