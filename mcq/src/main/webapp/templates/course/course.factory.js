(function() {
	'use strict';

	angular
		.module('myApp.course')
		.factory('courseFactory', courseFactory);

	courseFactory.$inject = ['courseHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function courseFactory(courseHttpFactory, $q, toastr) {
		var factory = {			
				getCourses : getCourses,
			deleteCourse: deleteCourse,
			addCourse : addCourse,
			
			
		};
		return factory;

		// ***************************************************************

		function getCourses() {
			var deferred = $q.defer();
			courseHttpFactory.getCourses().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		
	
		
		function deleteCourse(course){
			var deferred = $q.defer();
			courseHttpFactory.deleteCourse(course).then(function(response){
				toastr.success('Course Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addCourse(course){
			var deferred = $q.defer();
			courseHttpFactory.addCourse(course).then(function(response){
				toastr.success('course Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	

		
	}

})();