angular.module('app')
.controller('LoginCtrl', ['$scope', 'UserSvc', '$location', '$route', function($scope, UserSvc, $location, $route){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(response) {
				delete $scope.loginError
				$scope.$emit('login', response.data)
				$location.path('/')
				$route.reload()
			}, function () {
				$scope.loginError = "Wrong username or password"
			})
	}
}])