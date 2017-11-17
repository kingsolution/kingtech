(function() {
	'use strict';

	angular
	.module('myApp.topic', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.topic', {
					url : "/topic",
					views : {
						"sub" : {
							templateUrl : "templates/topic/topic.html",
							controller : "TopicController as vm"
						}
					}
				})
			});

})();