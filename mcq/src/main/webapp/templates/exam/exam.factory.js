(function() {
	'use strict';

	angular
		.module('myApp.exam')
		.factory('examFactory', examFactory);

	examFactory.$inject = ['examHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function examFactory(examHttpFactory, $q, toastr) {
		var service = {			
				getExams : getExams,
			deleteExam : deleteExam,
			addExam : addExam,
			
			
		};
		return service;

		// ***************************************************************

		function getExams() {
			var deferred = $q.defer();
			examHttpFactory.getExams().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		
	
		
		function deleteExam(exam){
			var deferred = $q.defer();
			examHttpFactory.deleteExam(exam).then(function(response){
				toastr.success('Exam Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addExam(exam){
			var deferred = $q.defer();
			examHttpFactory.addExam(exam).then(function(response){
				toastr.success('exam Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	

		
	}

})();