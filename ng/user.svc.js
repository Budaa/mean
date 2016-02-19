angular.module('app')
.service('UserSvc', function ($http, $location) {
	var svc = this
	svc.getUser = function () {
		return $http.get('/api/users')
	}

	svc.login = function (username, password) {
		return $http.post('/api/sessions', {
			username: username,
			password: password
		}).then(function (val) {
			window.localStorage.token = val.data
			$http.defaults.headers.common['X-Auth'] = val.data
			return svc.getUser()
		})
	}

	svc.createUser = function(username, password) {
		return $http.post('/api/users', {
			username: username,
			password: password
		}).then(function () {
      		return svc.login(username, password)
    	})
	}

	svc.logout = function(){
		$http.defaults.headers.common['X-Auth'] = ''
		$location.path('/login')
	}

	svc.setXAuthHeader = function(header){
		$http.defaults.headers.common['X-Auth'] = header
		return svc.getUser()
	}
})