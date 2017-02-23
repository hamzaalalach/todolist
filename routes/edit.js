var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/edit/:id/:value', function(req, res, next) {
	actions.edit(req.params.id, req.params.value);
	res.end();
});
module.exports = router;