var app = angular.module('app', [
	'ngRoute'
])
angular.module('app')
.controller('ApplicationCtrl', ['$scope', 'UserSvc', function($scope, UserSvc){
	if(window.localStorage.token) {
		UserSvc.setXAuthHeader(window.localStorage.token)
		UserSvc.getUser()
			.then(function(user){
				$scope.$emit('login', user)
			})
	}
	$scope.$on('login', function(_, user) {
		$scope.currentUser = user
	})
	$scope.logout = function() {
		delete $scope.currentUser
		delete $scope.posts
		UserSvc.logout()
	}
}])


angular.module('app')
.controller('LoginCtrl', ['$scope', 'UserSvc', '$location', function($scope, UserSvc, $location){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(response) {
				$scope.$emit('login', response.data)
				$location.path('/')
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
	$scope.register = function(username, password){
		UserSvc.createUser(username, password)
			.then(function(user) {
				$scope.$emit('login', user)
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
.service('UserSvc', function ($http, $location) {
	var svc = this
	svc.getUser = function () {
		return $http.get('/api/users')
	}

	svc.login = function (username, password) {
		return $http.post('/api/sessions', {
			username: username,
			password: password
		}).then(function (val) {
			window.localStorage.token = val.data
			$http.defaults.headers.common['X-Auth'] = val.data
			return svc.getUser()
		})
	}

	svc.createUser = function(username, password) {
		return $http.post('/api/users', {
			username: username,
			password: password
		}).then(function () {
      		return svc.login(username, password)
    	})
	}

	svc.logout = function(){
		$http.defaults.headers.common['X-Auth'] = ''
		$location.path('/login')
	}

	svc.setXAuthHeader = function(header){
		$http.defaults.headers.common['X-Auth']
	}
})