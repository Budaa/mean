var app = angular.module('app', [
	'ngRoute'
])
angular.module('app')
.controller('LoginCtrl', ['$scope', 'UserSvc', function($scope, UserSvc){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(user) {
				console.log(user)
			})
	}
}])
angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc){
	$scope.addPost = function() {
		if($scope.postBody) {
			PostsSvc.create({
				username: 'pbuderaski',
				body: $scope.postBody

			}).success(function(post) {
				$scope.posts.unshift(post)
				$scope.postBody = null
			})
		}
	}

	PostsSvc.fetch().success(function(posts) {
		$scope.posts = posts
	})
})


angular.module('app')
	.service('PostsSvc', function($http){
		this.fetch = function() {
			return $http.get('/api/posts')
		}
		this.create = function(post) {
			return $http.post('/api/posts', post)
		}
	})


angular.module('app')
	.config(function($routeProvider) {
		$routeProvider
		.when('/', { controller: 'PostsCtrl', templateUrl: 'posts.html' })
		.when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
		.when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' })
	})
angular.module('app')
.service('UserSvc', function ($http) {
	var svc = this
	svc.getUser = function () {
		return $http.get('/api/users', {
			headers: { 'X-Auth': this.token }
		})
	}

	svc.login = function (username, password) {
		return $http.post('/api/session', {
			username: username,
			password: password
		}).then(function (val) {
			svc.token = val.data
			return svc.getUser()
		})
	}
})