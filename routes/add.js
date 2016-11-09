var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.post('/add', function(req, res, next) {
	actions.save(req.body.add);
	res.redirect('/');
});
module.exports = router;