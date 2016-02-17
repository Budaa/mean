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

