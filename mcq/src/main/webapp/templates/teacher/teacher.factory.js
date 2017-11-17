(function() {
	'use strict';

	angular
		.module('myApp.teacher')
		.factory('teacherFactory', teacherFactory);

	teacherFactory.$inject = ['teacherHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function teacherFactory(teacherHttpFactory, $q, toastr) {
		var factory = {			
				getTeachers : getTeachers,
				
			deleteTeacher : deleteTeacher,
			addTeacher  : addTeacher,
			
			
		};
		return factory;

		// ***************************************************************

		function getTeachers() {
			var deferred = $q.defer();
			teacherHttpFactory.getTeachers().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		
		
	
		
		function deleteTeacher(teacher){
			var deferred = $q.defer();
			teacherHttpFactory.deleteTeacher(teacher).then(function(response){
				toastr.success('Teacher Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addTeacher(teacher){
			var deferred = $q.defer();
			teacherHttpFactory.addTeacher(teacher).then(function(response){
				toastr.success('Teacher Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	

		
	}

})();