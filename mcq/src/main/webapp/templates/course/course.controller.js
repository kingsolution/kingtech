(function() {
	'use strict';

	angular.module('myApp.course').controller('CourseController', CourseController)
			.controller('CourseModalCtrl', CourseModalCtrl).controller(
					'CourseModalAddEditCtrl', CourseModalAddEditCtrl);

	CourseController.$inject = [ '$state', 'courseFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	CourseModalCtrl.$inject = [ '$uibModalInstance', 'courseFactory', 'items','$scope' ];
	CourseModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'course', '$scope', 'courseFactory','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function CourseController($state, courseFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			courses : [],
			view : view,
			add : add,
			active : active,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadCourses();
		})();

		// ******************************************************

		function loadCourses() {
			courseFactory.getCourses().then(function(data) {
				vm.courses = data;
				console.log(JSON.stringify(vm.courses));
			});
			
		}
		
		function active(course){
			var msg = null;
			if(course.active==1){
				msg = "Course "+course.course_name+" De-Activated....', 'Successful !!";
			}else{
				msg = "Course "+course.course_name+" Activated....', 'Successful !!";
			}
			var url ="course/active";
			courseFactory.active(msg,url,course).then(function(){
				loadCourses();
			});
		}
		
		function delet(course){
			courseFactory.deleteCourse(course).then(function(){
				loadCourses();
			});
		}

		function view(course) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/course/courseModelView.html',
				controller : 'CourseModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return course;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(course) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/course/courseModelDelet.html',
				controller : 'CourseModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return course;
					}
				}
			});

			modalInstance.result.then(function() {
				loadCourses();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(course) {
			var cou = course ? course : {};
			//alert(JSON.stringify(cust));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/course/courseModelAddEdit.html',
				controller : 'CourseModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					course : function() {
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

	}

	function CourseModalCtrl($uibModalInstance, courseFactory,items, $scope) {
		var vm = angular.extend(this, {
			items : items,
			ok : ok,
			delet : delet,
			cancel : cancel
		});

		(function activate() {

		})();

		// ******************************************************

		function ok() {
			$uibModalInstance.close();
		}

		function delet(course){
			courseFactory.deleteCourse(course).then(function(){
				$uibModalInstance.close();
				loadCourses();
			});
		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function CourseModalAddEditCtrl($uibModalInstance, $uibModal,course, $scope , courseFactory,localStorageService,ApiEndpoint) {
	   var date= new Date();
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			
			
			ok : ok,
			
			cancel : cancel,
		});

		(function activate() {
			$scope.course = course;
			
			
		})();

		// ******************************************************
		
	
		
/*		function addCustomerType(customer) {
			var plant = customer? customer: {};
			// alert(JSON.stringify(usr));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/customer/customerTypeModelAddEdit.html',
				controller : 'CustomerModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					customer: function() {
						return plant;
					}
				}
			});

			modalInstance.result.then(function() {
				
				loadCustomerTypes();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}*/
		
		
		//
		

		function ok(course) {
			
			course.upd_datetime= new Date();
			course.upd_user_id=user.user_id;
			/*console.log(JSON.stringify(customer));*/
			courseFactory.addCourse(course).then(function(){
				$uibModalInstance.close(course);
			});
		}
	
		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
