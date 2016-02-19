angular.module('app')
.controller('ApplicationCtrl', ['$scope', 'UserSvc', function($scope, UserSvc){
	if(window.localStorage.token) {
		UserSvc.setXAuthHeader(window.localStorage.token)
			.then(function(user){
				$scope.$emit('login', user.data)
			})
	}
	$scope.$on('login', function(_, user) {
		$scope.currentUser = user
	})
	$scope.logout = function() {
		delete $scope.currentUser
		delete $scope.posts
		delete window.localStorage.token
		UserSvc.logout()
	}
}])

