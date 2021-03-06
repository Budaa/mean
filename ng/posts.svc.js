angular.module('app')
	.service('PostsSvc', ['$http', function($http){

		this.fetch = function(id) { 
			return $http.get('/api/posts', id)
		}
		this.create = function(post) {
			return $http.post('/api/posts', post)
		}

		this.deletePost = function(id) {
			return $http.put('/api/posts', id)

		}
	}])

