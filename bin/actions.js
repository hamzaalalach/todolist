var mongoose = require('mongoose'),
	Task = require('../models/task'),
	db = mongoose.connection;
mongoose.connect('mongodb://localhost/todolist');
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
	exports.save = function(newTask) {
		Task.create([{
			date: Date.now(),
			content: newTask
		}], function(error) {
			if (error) {
				console.log(error);
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
});