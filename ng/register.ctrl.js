angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc, $location){
	$scope.register = function(username, password, password2){
		if (!username) {
			$scope.registerError = "Please, select your username."
			return null
		}

		if( password2 != password || !password2) {
			$scope.registerError = "Passwords don't match"
			return null
		}
		UserSvc.createUser(username, password)
			.then(function(user) {
				$scope.$emit('login', user.data)
				$location.path('/')
		}, function(err) {
			$scope.registerError = err.data
			$scope.username = ''
			$scope.password = ''
			$scope.password2 = ''
		})
	} 
})

