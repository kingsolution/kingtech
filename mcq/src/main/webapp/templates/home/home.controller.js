(function() {
	'use strict';

	angular.module('myApp.home').controller('HomeController', HomeController);

	HomeController.$inject = [ '$state', '$uibModal', '$log',
			'$scope', 'toastr','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function HomeController($state, $uibModal, $log, $scope, toastr,localStorageService,ApiEndpoint) {
		$scope.userDetails = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			
		});

		(function activate() {
			
		})();

		// ******************************************************
	

	}
})();
