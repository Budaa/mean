var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 3000

//JSon Parser
app.use(bodyParser.json())

// ROUTERS
app.use('/api/posts', require('./controllers/api/posts'))
app.use(require('./controllers/static'))



//LISTEN
app.listen(port, function() {
	console.log('Server listening on port ' + port)

})
