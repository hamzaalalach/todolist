var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.post('/add/:value', function(req, res, next) {
	actions.save(req.params.value, req.user.username, function(task) {
		res.send(JSON.stringify({id: task[0]._id, date: task[0].date}));
	});
});
module.exports = router;