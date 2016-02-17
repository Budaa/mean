var express = require('express')
var jwt = require('jwt-simple')
var app = express()
var _ = require('lodash')
var bcrypt = require('bcrypt')

app.use(require('body-parser').json())

var secretKey = 'secret'

var users = [{
	username: 'pbuderaski',
	password: '$2a$10$otzK/1UYOX9axsFJTEnJ3.lYkRa95DeY.y8Y33JGBBx6XnvXYKjU6'
}]

function findUserByUsername(username) {
	return _.find(users, {
		username: username
	})
}

function validateUser(user, password, callback) {
	bcrypt.compare(password, user.password, callback)
}

app.post('/session', function(req, res) {
	var user = findUserByUsername(req.body.username)
	validateUser(user, req.body.password, function(err, valid) {
		if (err || !valid) {
			return res.send(401)
		}
		var token = jwt.encode({
			username: user.username
		}, secretKey)
		res.json(token)
	})
})

app.post('/user', function(req, res) {
	var token = req.body.token
	var user = jwt.decode(token, secretKey)
	res.json(user)
})

app.get('/', function(req, res) {
	res.sendfile('./test.html')
})

app.get('/app', function(req, res) {
	res.sendfile('./test.js')
})

app.listen(3001, function() {
	console.log('App listen on port 3001')
})