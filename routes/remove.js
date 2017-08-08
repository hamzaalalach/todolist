var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/remove/:id', function(req, res) {
	actions.removeOne(req.params.id);
});
router.get('/remove/', function(req, res) {
	actions.removeAll();
});
module.exports = router;