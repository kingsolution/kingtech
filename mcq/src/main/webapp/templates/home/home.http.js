(function () {
	'use strict';

	angular
		.module('myApp.home')
		.factory('homeHttpFactory', homeHttpFactory);

	homeHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function homeHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var homeUrl = ApiEndpoint.url+"entry";   // User Url
		
		// Variables
		var grants = {};

		var service = {
			
		};

		return service;
	
	}
})();
