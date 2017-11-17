(function() {
	'use strict';

	angular.module('myApp.subject').controller('SubjectController', SubjectController)
			.controller('SubjectModalCtrl', SubjectModalCtrl).controller(
					'SubjectModalAddEditCtrl', SubjectModalAddEditCtrl);

	SubjectController.$inject = [ '$state', 'subjectFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	SubjectModalCtrl.$inject = [ '$uibModalInstance', 'items','subjectFactory', '$scope' ];
	SubjectModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'subject', '$scope', 'subjectFactory','courseFactory','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function SubjectController($state, subjectFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			subjects : [],
			view : view,
			add : add,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadSubjects();
		})();

		// ******************************************************

		function loadSubjects() {
			subjectFactory.getSubjects().then(function(data) {
				vm.subjects = data;
				console.log(JSON.stringify(vm.subjects));
			});
			
		}
		
		function delet(subject){
			subjectFactory.deleteSubject(subject).then(function(){
				loadSubjects();
			});
		}

		function view(subject) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/subject/subjectModelView.html',
				controller : 'SubjectModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return subject;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(subject) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/subject/subjectModelDelet.html',
				controller : 'SubjectModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return subject;
					}
				}
			});

			modalInstance.result.then(function() {
				loadSubjects();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(subject) {
			var sub = subject ? subject : {};
		/*	alert(JSON.stringify(sub));*/
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/subject/subjectModelAddEdit.html',
				controller : 'SubjectModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					subject : function() {
						return sub;
					}
				}
			});

			modalInstance.result.then(function() {
				loadSubjects();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function SubjectModalCtrl($uibModalInstance, items,subjectFactory, $scope) {
		var vm = angular.extend(this, {
			items : items,
			ok : ok,
			cancel : cancel,
			delet : delet
		});

		(function activate() {

		})();

		// ******************************************************

		function ok() {
			$uibModalInstance.close();
		}

		 function delet(subject){
			 subjectFactory.deleteSubject(subject).then(function(){
				 $uibModalInstance.close();
				});
          }
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function  SubjectModalAddEditCtrl($uibModalInstance,$uibModal, subject, $scope , subjectFactory,courseFactory,localStorageService,ApiEndpoint) {
		var date= new Date();
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			courses:[],
			ok : ok,
			addCourse:addCourse,
		
			cancel : cancel,
		});

		(function activate() {
			$scope.subject = subject;
			loadCourses();
		})();

		// ******************************************************
		function loadCourses() {
			courseFactory.getCourses().then(function(data) {
				vm.courses = data;
				console.log(JSON.stringify(vm.courses));
			});
		}
		
		function addCourse(course) {
			var cou = course? course: {};
			// alert(JSON.stringify(usr));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/course/courseModelAddEdit.html',
				controller : 'CourseModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					course: function() {
						return cou;
					}
				}
			});

			modalInstance.result.then(function() {
				
				loadCourses();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		
		function ok(subject) {
		
			console.log(JSON.stringify(subject));
			subject.upd_datetime= new Date();
			subject.upd_user_id=userDetail.user_id;
			subject.active= 1;
			subjectFactory.addSubject(subject).then(function(){
				$uibModalInstance.close(subject);
			});
		}
		
		

		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
