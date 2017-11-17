(function () {
	'use strict';

	angular
		.module('myApp.subject')
		.factory('subjectHttpFactory', subjectHttpFactory);

	subjectHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function subjectHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var subjectUrl = ApiEndpoint.url+"subject";   // User Url
		
		// Variables
		var subjects= {};

		var factory = {
			addSubject : addSubject,
			getSubjects : getSubjects,
			deleteSubject : deleteSubject,
			
		};

		return factory;
		
		
		
		function getSubjects(){
		
			return $http.get(subjectUrl+'/listAllSubject');
		}
		
		function deleteSubject(subject){
			return $http.put(subjectUrl+'/delete/',subject);
		}
		
		function addSubject(subject){
			console.log(JSON.stringify(subject))
			return $http.post(subjectUrl+'/addSubject', subject);
		}
		
	}
})();
