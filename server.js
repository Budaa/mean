var express = require('express')
var bodyParser = require('body-parser')
var ws = require('./websockets')
var app = express()
var port = 3000


//AUTH
app.use(require('./auth'))

//JSon Parser
app.use(bodyParser.json())



// ROUTERS
app.use(require('./controllers/static'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use('/api/posts', require('./controllers/api/posts'))





//LISTEN
var server = app.listen(port, function() {
	console.log('Server listening on port ' + port)
})

ws.connect(server)