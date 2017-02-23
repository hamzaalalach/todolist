var mongoose = require('mongoose'),
	Task = require('../models/task'),
	User = require('../models/user'),
	bcrypt = require('bcryptjs'),
	db = mongoose.connection;
mongoose.connect('mongodb://dbuser:dbuser@ds021356.mlab.com:21356/todo');
//mongoose.connect('mongodb://localhost/todo');
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
	exports.findAll = function(username, callback) {
		Task.find({"username": username}, function(error, data) {
			if (error) {
				console.log(error);
			} else {
				callback(data);
			}
		});
	}
	exports.save = function(newTask, username, callback) {
		var date,
			currentDate = Date.now();
		if (/(\w+\s\w+\s\d+\s)\d+\s([0-9-:]+)/.test(new Date(currentDate))) {
			date = RegExp.$1 + '' + RegExp.$2;
		} else {
			date = Date.now()
		}
		Task.create([{
			date: date,
			content: newTask,
			username: username
		}], function(error, task) {
			if (error) {
				console.log(error);
			} else {
				callback(task);
			}
		});
	}
	exports.removeOne = function(taskId) {
		Task.remove({_id: taskId}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
	exports.edit = function(taskId, newValue) {
		Task.update({_id: taskId}, {$set: {content: newValue}}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
	exports.removeAll = function() {
		Task.remove({}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
	exports.createUser = function(name, username, email, password) {
		bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash(password, salt, function(err, hash) {
        		if (err) {
        			console.log(err);
        		} else {
        			User.create([{
        				name: name,
        				username: username,
        				email: email,
        				password: hash
        			}], function(error) {
        				if (error) {
        					console.log(error);
        				}
        			});
        		}
    		});
		});
	}
	exports.getUserByUsername = function(username, callback) {
		User.findOne({'username': username}, function(error, user) {
			if (error) {
				console.log(error);
			} else {
				callback(user);
			}
		});
	}
	exports.comparePassword = function(candidatePassword, hash, callback) {
		bcrypt.compare(candidatePassword, hash, function(error, isMatch) {
			if (error) {
				console.log(error);
			} else {
				callback(isMatch);
			}
		});
	}
	exports.getUserById = function(id, callback) {
		User.findById(id, function(error, user) {
			if (error) {
				console.log(error);
			} else {
				callback(user);
			}
		});
	}
});