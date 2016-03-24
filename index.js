var router = require('express').Router()
var bodyParser = require('body-parser')

router.use(bodyParser.json())


app.use(require('../auth'))

app.use('/api/sessions', require('./api/sessions'))
app.use('/api/users', require('./api/users'))
app.use('/api/posts', require('./api/posts'))
app.use(require('./static'))

module.exports = router