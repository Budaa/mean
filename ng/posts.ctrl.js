angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc){
	$scope.addPost = function() {
		if($scope.postBody) {
			PostsSvc.create({
				username: $scope.currentUser._id,
				body: $scope.postBody

			}).success(function(post) {
				post.username = {username: $scope.currentUser.username}
				$scope.posts.unshift(post)
				$scope.postBody = null
			})
		}
	}

	$scope.removePost = function(id, index) {
		console.log(id)
		PostsSvc.deletePost({id: id}).success(function(){
			alert('Post has been deleted')
			$scope.posts.splice(index, 1)
		}).error(function(err){
			console.log(err)
		})
	}

	PostsSvc.fetch().success(function(posts) {
		$scope.posts = posts
			console.log($scope.posts)
	}).error(function(){
		$scope.postserr = "Please log in!"
	})
})

