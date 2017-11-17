(function() {
	'use strict';

	angular.module('myApp.exam').controller('ExamController', ExamController)
			.controller('ExamModalCtrl', ExamModalCtrl).controller(
					'ExamModalAddEditCtrl', ExamModalAddEditCtrl);

	ExamController.$inject = [ '$state', 'examFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	ExamModalCtrl.$inject = [ '$uibModalInstance', 'examFactory', 'items','$scope' ];
	ExamModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'exam', '$scope', 'examFactory','subjectFactory','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function ExamController($state, examFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			exams : [],
			view : view,
			add : add,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadExams();
		})();

		// ******************************************************

		function loadExams() {
			examFactory.getExams().then(function(data) {
				vm.exams = data;
				console.log(JSON.stringify(vm.exams));
			});
			
		}
		
		function delet(exam){
			examFactory.deleteExam(exam).then(function(){
				loadExams();
			});
		}

		function view(exam) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/exam/examModelView.html',
				controller : 'ExamModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return exam;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(exam) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/exam/examModelDelet.html',
				controller : 'ExamModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return exam;
					}
				}
			});

			modalInstance.result.then(function() {
				loadExams();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(exam) {
			var exa = exam ? exam : {};
			//alert(JSON.stringify(cust));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/exam/examModelAddEdit.html',
				controller : 'ExamModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					exam : function() {
						return exa;
					}
				}
			});

			modalInstance.result.then(function() {
				loadExams();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function ExamModalCtrl($uibModalInstance, examFactory,items, $scope) {
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

		function delet(exam){
			examFactory.deleteExam(exam).then(function(){
				$uibModalInstance.close();
				loadExams();
			});
		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function ExamModalAddEditCtrl($uibModalInstance, $uibModal,exam, $scope , examFactory,subjectFactory,localStorageService,ApiEndpoint) {
	   var date= new Date();
		var user = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			subjects : [],
			
			ok : ok,
			
			cancel : cancel,
		});

		(function activate() {
			$scope.exam = exam;
			loadSubjects();
			
		})();

		// ******************************************************
		function loadSubjects() {
			subjectFactory.getSubjects().then(function(data) {
				vm.subjects = data;
				console.log(JSON.stringify(vm.subjects));
			});
		}
	
		
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
		

		function ok(exam) {
			
			exam.upd_datetime= new Date();
			exam.upd_user_id=userDetail.user_id;
			/*console.log(JSON.stringify(customer));*/
			examFactory.addExam(exam).then(function(){
				$uibModalInstance.close(exam);
			});
		}
	
		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
