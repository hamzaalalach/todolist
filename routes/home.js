var express = require('express'),
	router = express.Router();
router.get('/', ensureAuthenticated, function(req, res) {
});
function ensureAuthenticated(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/dashboard');
	} else {
		res.redirect('/login');
	}
}
module.exports = router;