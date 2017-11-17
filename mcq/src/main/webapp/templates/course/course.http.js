(function () {
	'use strict';

	angular
		.module('myApp.course')
		.factory('courseHttpFactory', courseHttpFactory);

	courseHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function courseHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var course = localStorageService.get(ApiEndpoint.userKey);
		var courseUrl = ApiEndpoint.url+"course";
		
		
		// Variables
		var courses = {};

		var factory = {
					
			    addCourse : addCourse,
			    getCourses : getCourses,
			    deleteCourse : deleteCourse
			 
			
		};

		return factory;
		
		function getCourses(){
			return $http.get(courseUrl+'/listAllCourse');
		}
		
		function deleteCourse(course){
			return $http.put(courseUrl+'/delete/',course);
		}
		
		function addCourse(course){
			console.log(JSON.stringify(course))
			return $http.post(courseUrl+'/addCourse', course);
		}
		
	}
})();
