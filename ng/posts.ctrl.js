angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc){
	$scope.addPost = function() {
		if($scope.postBody) {
			PostsSvc.create({
				username: $scope.currentUser.username,
				body: $scope.postBody

			}).success(function(post) {
				$scope.posts.unshift(post)
				$scope.postBody = null
			})
		}
	}

	$scope.removePost = function(id, index) {
		PostsSvc.deletePost({id: id}).success(function(){
			alert('Post has been deleted')
			$scope.posts.splice(index, 1)
		}).error(function(er){
			console.log(er)
		})
	}

	PostsSvc.fetch().success(function(posts) {
		$scope.posts = posts
	}).error(function(){
		$scope.postserr = "Please log in!"
	})
})

