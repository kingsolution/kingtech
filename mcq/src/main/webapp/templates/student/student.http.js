(function () {
	'use strict';

	angular
		.module('myApp.student')
		.factory('studentHttpFactory', studentHttpFactory);

	studentHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function studentHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var studentUrl = ApiEndpoint.url+"student";
		
		
		// Variables
		var students = {};

		var factory = {
				getStudent : getStudent,	
			    addStudent : addStudent,
			    getStudents : getStudents,
			    deleteStudent : deleteStudent
			 
			
		};

		return factory;
		
		function getStudents(){
			return $http.get(studentUrl+'/listAllStudent');
		}
		
		function getStudent(){
			return $http.get(studentUrl+'/getMaxStudent');
		}
		
		function deleteStudent(student){
			return $http.put(studentUrl+'/delete/',student);
		}
		
		function addStudent(student){
			console.log(JSON.stringify(student))
			return $http.post(studentUrl+'/addStudent', student);
		}
		
	}
})();
