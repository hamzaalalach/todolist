var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.post('/add/:value', function(req, res, next) {
	actions.save(req.params.value, function(task) {
		res.send(task[0]._id);
	});
});
module.exports = router;