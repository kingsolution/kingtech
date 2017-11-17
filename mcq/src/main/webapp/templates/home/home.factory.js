(function() {
	'use strict';

	angular
		.module('myApp.home')
		.factory('homeFactory', homeFactory);

	homeFactory.$inject = ['homeHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function homeFactory(homeHttpFactory, $q, toastr) {
		var service = {			
			
		};
		return service;

		// ***************************************************************

		
	}

})();