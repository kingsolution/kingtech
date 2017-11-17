(function() {
	'use strict';

	angular
		.module('myApp.user')
		.factory('userFactory', userFactory);

	userFactory.$inject = ['userHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function userFactory(userHttpFactory, $q, toastr) {
		var service = {			
			getUsers : getUsers,
			deleteUser : deleteUser,
			addUser : addUser,
			getRoles : getRoles,
			active: active,
			getUserTypes : getUserTypes
		};
		return service;

		// ***************************************************************

		function getUsers() {
			var deferred = $q.defer();
			userHttpFactory.getUsers().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		function active(user){
			
			var deferred = $q.defer();
			userHttpFactory.active(user).then(function(response){
				if(user.active==0){
					
					toastr.success('User Activated ....', 'Succesful !!');
				}else{
					
					toastr.success('User  Deactived ....', 'Succesful !!');
				}	
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function deleteUser(user){
			var deferred = $q.defer();
			userHttpFactory.deleteUser(user).then(function(response){
				toastr.success('User Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addUser(user){
			var deferred = $q.defer();
			userHttpFactory.addUser(user).then(function(response){
				toastr.success('User Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function getRoles() {
			var deferred = $q.defer();
			userHttpFactory.getRoles().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		function getUserTypes() {
			var deferred = $q.defer();
			userHttpFactory.getUserTypes().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}

		
	}

})();