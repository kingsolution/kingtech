(function() {
	'use strict';

	angular
	.module('myApp.teacher', [ 'datatables' ])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.teacher', {
					url : "/teacher",
					views : {
						"sub" : {
							templateUrl : "templates/teacher/teacher.html",
							controller : "TeacherController as vm"
						}
					}
				})
			});

})();