var Post = require('../../models/post')
var User = require('../../models/user')
var user_id = null

var router = require('express').Router()


router.get('/', function(req, res, next) {
	if(!req.auth) {
		return res.status(401).send({status:401, message: 'Filed to log in.'});
	}
	User.find({username: req.auth.username}, {type: '_id', limit: 1}).exec(function(err, result){
		if (err) {return next(err)}
		user_id = result[0]._id
	})

	Post.find({username: user_id})
	    .sort('-date')
	    .populate({path: 'username', select: 'username'})
	    .exec(function(err, posts) {
			if ( err ) { return next(err) }
		    res.json(posts)
		})
})


router.post('/', function(req, res, next) {
	var post = new Post({
		body: req.body.body,
		username: req.body.username
	})
	post.save(function(err, post) {
		if (err) { return next(err) }
		res.json(201, post)
	})
})

router.put('/', function(req, res, next) {
	console.log(req.body)
	Post.remove({_id: req.body.id })
		.exec(function(err) {
			if (err) { return next (err) }
			res.send(true)
		} )
})

module.exports = router