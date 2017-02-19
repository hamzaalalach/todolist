var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/remove/:id', function(req, res, next) {
	actions.removeOne(req.params.id);
});
module.exports = router;