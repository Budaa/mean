var db = require('../db')
// var userSchema = require('./user')
// var User = db.model('User', userSchema);

var Post = db.model('Post', {
	username: {
		type: db.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	body: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = Post