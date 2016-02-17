angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc){
	$scope.register = function(){
		UserSvc.createUser($scope.username, $scope.password)
			.success(function(){
				UserSvc.login($scope.username, $scope.password)
		})
	} 
})

