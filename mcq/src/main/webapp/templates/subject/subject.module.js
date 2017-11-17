(function() {
	'use strict';

	angular
	.module('myApp.subject', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.subject', {
					url : "/subject",
					views : {
						"sub" : {
							templateUrl : "templates/subject/subject.html",
							controller : "SubjectController as vm"
						}
					}
				})
			});

})();