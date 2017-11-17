(function () {
	'use strict';

	angular
		.module('myApp.teacher')
		.factory('teacherHttpFactory', teacherHttpFactory);

	teacherHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function teacherHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var teacherUrl = ApiEndpoint.url+"teacher";
		
		
		// Variables
		var teachers = {};

		var factory = {
				
			    addTeacher : addTeacher,
			    getTeachers : getTeachers,
			    deleteTeacher : deleteTeacher
			 
			
		};

		return factory;
		
		function getTeachers(){
			return $http.get(teacherUrl+'/listAllTeacher');
		}
		
		
		
		function deleteTeacher(teacher){
			return $http.put(teacherUrl+'/delete/',teacher);
		}
		
		function addTeacher(teacher){
			console.log(JSON.stringify(teacher))
			return $http.post(teacherUrl+'/addTeacher', teacher);
		}
		
	}
})();
