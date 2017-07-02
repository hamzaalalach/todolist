var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions');
router.get('/register', function(req, res) {
	res.render('register');
});
router.post('/register', function(req, res) {
	var firstName = req.body.firstName,
		username = req.body.username,
		email = req.body.email,
		password = req.body.password,
		conPassword = req.body.conPassword,
		check = {},
		res = res;
	if (/^\w{2,}$/i.test(firstName)) {
		check.firstName = true;
	} else {
		check.firstName = false;
	}
	if (/^[a-z0-9-_]{6,20}$/i.test(username)) {
		check.username = true;
	} else {
		check.username = false;
	}
	if (/^[a-z0-9-_.]+@[a-z0-9]+\.[\w]{2,3}$/i.test(email)) {
		check.email = true;
	} else {
		check.email = false;
	}
	if (/^[\w\d\s/@]{4,20}$/i.test(password)) {
		check.password = true;
	} else {
		check.password = false;
	}
	if (conPassword === password) {
		check.conPassword = true;
	} else {
		check.conPassword = false;
	}
	if (check.firstName && check.username && check.email && check.password && check.conPassword) {
		actions.getUserByUsername(username, function(user) {
			if (!user) {
				actions.createUser(firstName, username, email, password);
				res.redirect('/login');
			} else {
				var error = 'Username taken';
				res.render('register', {error});
			}
		});
	}
});
module.exports = router;