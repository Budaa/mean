angular.module('app')
	.service('PostsSvc', function($http){

		this.fetch = function() { 
			return $http.get('/api/posts')
		}
		this.create = function(post) {
			return $http.post('/api/posts', post)
		}

		this.deletePost = function(id) {
			return $http.put('/api/posts', id)

		}
	})

