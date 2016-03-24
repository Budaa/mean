describe('posts.svc', function() {
	beforeEach(module('app'))
	var PostsSvc

	beforeEach(inject(function (_PostsSvc_) {
		PostsSvc = _PostsSvc_
	}))

	describe('#fetch', function() {
		it('exists', function() {
			expect(PostsSvc.fetch).to.exist
		})
	})
})