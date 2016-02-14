var app = angular.module('test', [])

app.controller('TestCtrl', function($scope, $http){
	$scope.getToken = function() {
		$http.post('/session', {
			username: "pbuderaski",
			password: $scope.password
		}).then(function(val) {
			$scope.token = val.data.replace(/"/gi,'')
			$scope.getUsername()
			$scope.password = ''
		}, function(err) {
				$scope.errmessage = 'Wrong password'
		})
	}
	$scope.getUsername = function() {
		$http.post('/user', {
			token: $scope.token
		}).then(function(val) {
			$scope.username = val.data.username
			$scope.errmessage = ' logged as ' + $scope.username
		}, function(err) {
			console.log(err)
		})
	}
})