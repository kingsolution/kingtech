(function() {
	'use strict';

	angular
	.module('myApp.question', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.question', {
					url : "/question",
					views : {
						"sub" : {
							templateUrl : "templates/question/question.html",
							controller : "QuestionController as vm"
						}
					}
				})
			});

})();