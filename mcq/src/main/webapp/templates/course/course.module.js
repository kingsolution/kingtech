(function() {
	'use strict';

	angular
	.module('myApp.course', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.course', {
					url : "/course",
					views : {
						"sub" : {
							templateUrl : "templates/course/course.html",
							controller : "CourseController as vm"
						}
					}
				})
			});

})();