var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/dashboard', ensureAuthenticated, function(req, res) {
	actions.findAll(req.user.username, function(data) {
		user = req.user;
		res.render('index', {data, user});
	});
});
router.get('/dashboard/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});
router.get('/dashboard/settings', function(req, res) {
	user = req.user;
	res.render('settings', {user});
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}
module.exports = router;