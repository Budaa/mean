angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc){
	$scope.register = function(username, password){
		UserSvc.createUser(username, password)
			.then(function(user) {
				$scope.$emit('login', user.data)
		}, function(err) {
			$scope.registerError = err.data
			$scope.username = ''
			$scope.password = ''
		})
	} 
})

