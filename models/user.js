var mongoose = require('mongoose'),
	userSchema = mongoose.Schema({
		name: String,
		username: String,
		email: String,
		password: String
	});
User = mongoose.model('User', userSchema);
module.exports = User;