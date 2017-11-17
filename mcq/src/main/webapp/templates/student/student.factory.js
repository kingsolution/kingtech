(function() {
	'use strict';

	angular
		.module('myApp.student')
		.factory('studentFactory', studentFactory);

	studentFactory.$inject = ['studentHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function studentFactory(studentHttpFactory, $q, toastr) {
		var factory = {			
				getStudents : getStudents,
				getStudent : getStudent,
			deleteStudent : deleteStudent,
			addStudent : addStudent,
			
			
		};
		return factory;

		// ***************************************************************

		function getStudents() {
			var deferred = $q.defer();
			studentHttpFactory.getStudents().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		function getStudent() {
			var deferred = $q.defer();
			studentHttpFactory.getStudent().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		
	
		
		function deleteStudent(student){
			var deferred = $q.defer();
			studentHttpFactory.deleteStudent(student).then(function(response){
				toastr.success('Student Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addStudent(student){
			var deferred = $q.defer();
			studentHttpFactory.addStudent(student).then(function(response){
				toastr.success('Student Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	

		
	}

})();