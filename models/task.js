var mongoose = require('mongoose'),
	taskSchema = mongoose.Schema({
		date: String,
		content: String
	}),
	Task = mongoose.model('Task', taskSchema);
module.exports = Task;