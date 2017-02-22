var mongoose = require('mongoose'),
	Task = require('../models/task'),
	db = mongoose.connection;
//mongoose.connect('mongodb://dbuser:dbuser@ds021356.mlab.com:21356/todo');
mongoose.connect('mongodb://localhost/todo');
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
	exports.findAll = function(callback) {
		Task.find(function(error, data) {
			if (error) {
				console.log(error);
			} else {
				callback(data);
			}
		})
	}
	exports.save = function(newTask, callback) {
		var date,
			currentDate = Date.now();
		if (/(\w+\s\w+\s\d+\s)\d+\s([0-9-:]+)/.test(new Date(currentDate))) {
			date = RegExp.$1 + '' + RegExp.$2;
		} else {
			date = Date.now()
		}
		Task.create([{
			date: date,
			content: newTask
		}], function(error, task) {
			if (error) {
				console.log(error);
			} else {
				callback(task);
			}
		})
	}
	exports.removeOne = function(taskId) {
		Task.remove({_id: taskId}, function(error) {
			if (error) {
				console.log(error);
			}
		})
	}
	exports.edit = function(taskId, newValue) {
		Task.update({_id: taskId}, {$set: {content: newValue}}, function(error) {
			if (error) {
				console.log(error);
			}
		})
	}
	exports.removeAll = function() {
		Task.remove({}, function(error) {
			if (error) {
				console.log(error);
			}
		})
	}
});