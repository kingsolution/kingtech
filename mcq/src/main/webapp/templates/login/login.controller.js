(function() {
	'use strict';

	angular
		.module('myApp.login')
		.controller('loginController', loginController);

		loginController.$inject = ['$rootScope','$scope','$stateParams','$state','localStorageService','toastr', 'ApiEndpoint','loginFactory','$location','$window'];

	/* @ngInject */
	function loginController($rootScope, $stateParams, $scope, $state, localStorageService,toastr, ApiEndpoint, loginFactory,$location,$window) {

		var vm = angular.extend(this, {
			doLogin : doLogin

		});

		(function activate() {
					
		})();

		// ******************************************************

		function doLogin(login) {
			console.log(JSON.stringify(login));
			loginFactory.doLogin(login).then(function(response){
				console.log(JSON.stringify(response));
				if (response.status=='200') {
					loginFactory.SetCredentials(login);
				//	$location.path('/main/home');
					toastr.success('Login....', 'Succesful !!');
					localStorageService.set(ApiEndpoint.userKey, response.data);
					$window.location.reload();
				} else {
					toastr.error('Username and Password Doesnt match...!!');
				}
				/*if(response.data.length != 0){
					$state.go('main.home');
					toastr.success('Login....', 'Succesful !!');
					localStorageService.set(ApiEndpoint.userKey, response.data);
				}else{
					toastr.error('Username and Password Doesnt match...!!');
				}*/
			});
		}
	}
})();
