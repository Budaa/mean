angular.module('app')
.controller('LoginCtrl', ['$scope', 'UserSvc', function($scope, UserSvc){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(response) {
				$scope.$emit('login', response.data)
			})
	}
}])