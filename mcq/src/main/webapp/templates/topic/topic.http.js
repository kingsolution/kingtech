(function () {
	'use strict';

	angular
		.module('myApp.topic')
		.factory('topicHttpFactory', topicHttpFactory);

	topicHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function topicHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var topicUrl = ApiEndpoint.url+"topic";  
		// User Url
		
		// Variables
		var topics= {};

		var factory = {
			add : add,
			getAll : getAll,
			delet : delet,
			
		};

		return factory;
		
		
		
		function getAll(){
			return $http.get(topicUrl+'/listAllTopic');
		}
		
		function delet(topic){
			return $http.put(topicUrl+'/deleteTopic/',topic);
		}
		
		function add(topic){
			console.log(JSON.stringify(topic))
			return $http.post(topicUrl+'/addTopic', topic);
		}
		
	}
})();
