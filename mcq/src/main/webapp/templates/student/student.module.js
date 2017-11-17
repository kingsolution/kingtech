(function() {
	'use strict';

	angular
	.module('myApp.student', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.student', {
					url : "/student",
					views : {
						"sub" : {
							templateUrl : "templates/student/student.html",
							controller : "StudentController as vm"
						}
					}
				})
			});

})();