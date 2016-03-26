var db = require('../db')
var user = db.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false
	}
	following: {
		type: db.Schema.ObjectId,
		ref: 'User',
		required: false		
	}
})

module.exports = db.model('User', user)