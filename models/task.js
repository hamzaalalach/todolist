var mongoose = require('mongoose'),
	taskSchema = mongoose.Schema({
		date: String,
		content: String,
		username: String
	}),
	Task = mongoose.model('Task', taskSchema);
module.exports = Task;