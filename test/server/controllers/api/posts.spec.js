var expect = require('chai').expect
var api = require('../../support/api')
var user = require('../../support/user')
var Post = require('../../../../models/post')

describe('controllers.api.posts', function () {
  beforeEach(function (done) {
    Post.remove({}, done)
  })

  describe('GET /api/posts', function () {
    beforeEach(function (done) {
      var posts = [
        {body: 'post1', username: '56e354e55e0207300eb2707e'},
        {body: 'post2', username: '56e354e55e0207300eb2707e'},
        {body: 'post3', username: '56e354e55e0207300eb2707e'}
      ]
      Post.create(posts, done)
    })

    it('has 3 posts', function (done) {
      api.get('/api/posts')
      .expect(200)
      .expect(function (response) {
        expect(response.body).to.have.length(3)
      })
      .end(done)
    })
  })

  describe('POST /api/posts', function () {
    var token

    beforeEach(function (done) {
      user.create('Buda', 'pass', function (err, user) {
        token = user.token
        done(err)
      })
    })

    beforeEach(function (done) {
      api.post('/api/posts')
      .send({body: 'this is my new post'})
      .set('X-Auth', token)
      .expect(201)
      .end(done)
    })

    it('added 1 new post', function (done) {
      Post.findOne(function (err, post) {
        expect(post.body).to.equal('this is my new post')
        done(err)
      })
    })
  })
})