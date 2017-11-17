(function () {
	'use strict';

	angular
		.module('myApp.question')
		.factory('questionHttpFactory', questionHttpFactory);

	questionHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function questionHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var question = localStorageService.get(ApiEndpoint.userKey);
		var questionUrl = ApiEndpoint.url+"question";
		
		
		// Variables
		var questions = {};

		var factory = {
					
			    addQuestion : addQuestion,
			    getQuestions : getQuestions,
			    deleteQuestion : deleteQuestion
			 
			
		};

		return factory;
		
		function getQuestions(){
			return $http.get(questionUrl+'/listAllQuestion');
		}
		
		function deleteQuestion(question){
			return $http.put(questionUrl+'/delete/',question);
		}
		
		function addQuestion(question){
			console.log(JSON.stringify(question))
			return $http.post(questionUrl+'/create', question);
		}
		
	}
})();
