var express = require('express'),
	router = express.Router(),
	actions = require('../bin/actions'),
	bcrypt = require('bcryptjs');
router.get('/dashboard', ensureAuthenticated, function(req, res) {
	actions.findAll(req.user.username, function(data) {
		user = req.user;
		res.render('index', {data, user});
	});
});
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});
router.get('/settings', ensureAuthenticated, function(req, res) {
	user = req.user;
	res.render('settings', {user});
});
router.post('/settings', function(req, res) {
	var firstName = req.body.firstName,
		email = req.body.email,
		password = req.body.password,
		conPassword = req.body.conPassword,
		oldPassword = req.body.oldPassword,
		username = req.body.username,
		check = {};
	if (/^\w{2,}$/i.test(firstName)) {
		check.firstName = true;
	} else {
		check.firstName = false;
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
	if (/^[\w\d\s/@]{4,20}$/i.test(oldPassword)) {
		check.oldPassword = true;
	} else {
		check.oldPassword = false;
	}
	if (conPassword === password) {
		check.conPassword = true;
	} else {
		check.conPassword = false;
	}
	actions.getUserByUsername(username, function(user) {
		actions.comparePassword(oldPassword, user.password, function(isMatch) {
			if (!isMatch) {
				var error = ["Wrong password"];
				res.render('settings', {error});
			} else {
				if (firstName != user.name && check.firstName) {
					actions.editFirstName(firstName, username);
				}
				if (email != user.email && check.email) {
					actions.editEmail(email, username);
				}
				if (check.password && check.conPassword) {
					actions.comparePassword(password, user.password, function(isMatch) {
						if (!isMatch) {
							bcrypt.genSalt(10, function(err, salt) {
								bcrypt.hash(password, salt, function(err, hash) {
									if (err) {
										console.log(err);
									} else {
										actions.editPassword(hash, username);
									}
								});
							});
						}
					});
				}
				res.render('settings');
			}
		});
	});
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		var error = ["Login first!"];
		res.render('login', {error});
	}
}
module.exports = router;