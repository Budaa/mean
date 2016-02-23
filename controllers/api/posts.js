var Post = require('../../models/post')

var router = require('express').Router()


router.get('/', function(req, res, next) {
	if(!req.auth) {
		return res.status(401).send({status:401, message: 'Filed to log in.'});
	}
	Post.find({username: req.auth.username})
	    .sort('-date')
	    .exec(function(err, posts) {
			if ( err ) { return next(err) }
		    res.json(posts)
		})
})


router.post('/', function(req, res, next) {
	var post = new Post({
		body: req.body.body
	})
	post.username = req.auth.username
	post.save(function(err, post) {
		if (err) { return next(err) }
		res.json(201, post)
	})
})

router.put('/', function(req, res, next) {
	Post.remove({_id: req.body.id })
		.exec(function(err) {
			if (err) { return next (err) }
			res.send(true)
		} )
})

module.exports = router