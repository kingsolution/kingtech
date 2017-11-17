(function () {
	'use strict';

	angular
		.module('myApp.exam')
		.factory('examHttpFactory', examHttpFactory);

	examHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function examHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var exam = localStorageService.get(ApiEndpoint.userKey);
		var examUrl = ApiEndpoint.url+"exam";
		
		
		// Variables
		var exams = {};

		var factory = {
					
			    addExam : addExam,
			    getExams : getExams,
			    deleteExam : deleteExam
			 
			
		};

		return factory;
		
		function getExams(){
			return $http.get(examUrl+'/listAllExam');
		}
		
		function deleteExam(exam){
			return $http.put(examUrl+'/delete/',exam);
		}
		
		function addExam(exam){
			console.log(JSON.stringify(exam))
			return $http.post(examUrl+'/addExam', exam);
		}
		
	}
})();
