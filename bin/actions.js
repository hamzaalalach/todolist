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
});