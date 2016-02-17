var app = angular.module('app', [
	'ngRoute'
])
angular.module('app')
.controller('ApplicationCtrl', ['$scope', function($scope){
	$scope.$on('login', function(_, user) {
		$scope.currentUser = user
	})
}])


angular.module('app')
.controller('LoginCtrl', ['$scope', 'UserSvc', function($scope, UserSvc){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(response) {
				$scope.$emit('login', response.data)
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
	}).error(function(){
		$scope.postserr = "Pleae log in!"
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
.controller('RegisterCtrl', function($scope, UserSvc){
	$scope.register = function(){
		UserSvc.createUser($scope.username, $scope.password)
			.success(function(){
				UserSvc.login($scope.username, $scope.password)
		})
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
		return $http.get('/api/users')
	}

	svc.login = function (username, password) {
		return $http.post('/api/sessions', {
			username: username,
			password: password
		}).then(function (val) {
			svc.token = val.data
			$http.defaults.headers.common['X-Auth'] = val.data
			return svc.getUser()
		})
	}

	svc.createUser = function(username, password) {
		return $http.post('/api/users', {
			username: username,
			password: password
		})
	}
})