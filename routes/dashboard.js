var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/dashboard', ensureAuthenticated, function(req, res) {
	actions.findAll(req.user.username, function(data) {
		res.render('index', {data});
		res.end();	
	});
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}
module.exports = router;