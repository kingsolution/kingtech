(function () {
	'use strict';

	angular
		.module('myApp.user')
		.factory('userHttpFactory', userHttpFactory);

	userHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function userHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var userUrl = ApiEndpoint.url+"user";   // User Url
		
		// Variables
		var users = {};

		var service = {
			addUser : addUser,
			getUsers : getUsers,
			deleteUser : deleteUser,
			getRoles : getRoles,
			active : active,
			getUserTypes : getUserTypes
		};

		return service;
	
		function getRoles(){
			return $http.get(userUrl+'/role');
		}
		
		function getUserTypes(){
			return $http.get(userUrl+'/user_type');
		}
		
		function active(user){
			return $http.post(userUrl+'/active',user);
		}
		
		
		function getUsers(){
			return $http.get(userUrl+'/list');
		}
		
		function deleteUser(user){
			return $http.post(userUrl+'/delete/',user);
		}
		
		function addUser(user){
			console.log(JSON.stringify(user))
		return $http.post(userUrl+'/create', user);
		
		
		
		 
	}
	}
})();
