(function() {
	'use strict';

	angular
		.module('myApp.main')
		.controller('mainController', mainController);

		mainController.$inject = ['localStorageService', 'ApiEndpoint', '$state','loginFactory'];

	/* @ngInject */
	function mainController(localStorageService, ApiEndpoint, $state,loginFactory) {
		var userDetails = localStorageService.get(ApiEndpoint.userKey);
		//console.log(JSON.stringify(userDetail));
		var vm = angular.extend(this, {
			doLogout : doLogout,
			user : userDetails
		});

		(function activate() {
				
		})();

		// ******************************************************

		function doLogout (){
			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
		}

	}
})();
