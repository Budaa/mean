var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect

describe('making a post', function() {
	it('logs in and creates a new post', function() {
		browser.get('http://localhost:3001')

		//click 'login'
		element(by.css('nav .login')).click()

		//fill out and submit login form
		element(by.model('username')).sendKeys('Buda')
		element(by.model('password')).sendKeys('pass')
		element(by.css('form .btn')).click()

		// submit a new post o the post page
		var post= 'test post' + Math.random()
		element(by.model('postBody')).sendKeys(post)
		element(by.css('form .btn')).click()

		// the user should now see their post as the first post on the page
		expect(element.all(by.css('ul.list-group li')).first().getText()).to.eventually.contain(post)
	})
})