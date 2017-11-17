(function() {
	'use strict';

	angular
		.module('myApp.subject')
		.factory('subjectFactory', subjectFactory);

	subjectFactory.$inject = ['subjectHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function subjectFactory(subjectHttpFactory, $q, toastr) {
		var factory = {			
			getSubjects : getSubjects,
			deleteSubject : deleteSubject,
			addSubject : addSubject
		};
		return factory;

		// ***************************************************************

		
		
		function getSubjects() {
			var deferred = $q.defer();
			subjectHttpFactory.getSubjects().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		function deleteSubject(subject){
			var deferred = $q.defer();
			subjectHttpFactory.deleteSubject(subject).then(function(response){
				toastr.success('Subject Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addSubject(subject){
			var deferred = $q.defer();
			subjectHttpFactory.addSubject(subject).then(function(response){
				toastr.success('Subject Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	}

})();