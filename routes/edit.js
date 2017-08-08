var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/edit/:id/:value', function(req, res, next) {
	actions.edit(req.params.id, req.params.value);
});
module.exports = router;