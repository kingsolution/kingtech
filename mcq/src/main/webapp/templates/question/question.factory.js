(function() {
	'use strict';

	angular
		.module('myApp.question')
		.factory('questionFactory', questionFactory);

	questionFactory.$inject = ['questionHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function questionFactory(questionHttpFactory, $q, toastr) {
		var factory = {			
				getQuestions : getQuestions,
			deleteQuestion : deleteQuestion,
			addQuestion : addQuestion,
			
			
		};
		return factory;

		// ***************************************************************

		function getQuestions() {
			var deferred = $q.defer();
			questionHttpFactory.getQuestions().then(function(response){
				deferred.resolve(response.data);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		
	
		
		function deleteQuestion(question){
			var deferred = $q.defer();
			questionHttpFactory.deleteQuestion(question).then(function(response){
				toastr.success('Question Deleted....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addQuestion(question){
			var deferred = $q.defer();
			questionHttpFactory.addQuestion(question).then(function(response){
				toastr.success('Question Added....', 'Succesful !!');
				deferred.resolve(response.data);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	

		
	}

})();