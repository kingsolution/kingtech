(function() {
	'use strict';

	angular
	.module('myApp.exam', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.exam', {
					url : "/exam",
					views : {
						"sub" : {
							templateUrl : "templates/exam/exam.html",
							controller : "ExamController as vm"
						}
					}
				})
			});

})();