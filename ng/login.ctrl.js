angular.module('app')
.controller('LoginCtrl', ['$scope', 'UserSvc', '$location', function($scope, UserSvc, $location){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(response) {
				delete $scope.loginError
				$scope.$emit('login', response.data)
				$location.path('/')
			}, function () {
				$scope.loginError = "Wrong username or password"
			})
	}
}])