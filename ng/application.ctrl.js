angular.module('app')
.controller('ApplicationCtrl', ['$scope', function($scope){
	$scope.$on('login', function(_, user) {
		$scope.currentUser = user
	})
}])

