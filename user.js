var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/auth_demo')
var user = mongoose.Schema({
	username: String,
	password: {
		type: String,
		select: false
	}
})

module.exports = mongoose.model('User', user)