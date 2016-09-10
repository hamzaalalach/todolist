var mongoose = require('mongoose'),
	taskSchema = mongoose.Schema({
		date: Date,
		content: String
	}),
	Task = mongoose.model('Task', taskSchema);
module.exports = Task;