(function() {
	'use strict';

	angular.module('myApp.teacher').controller('TeacherController',TeacherController)
			.controller('TeacherModalCtrl', TeacherModalCtrl).controller(
					'TeacherModalAddEditCtrl', TeacherModalAddEditCtrl);

	TeacherController.$inject = [ '$state', 'teacherFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	TeacherModalCtrl.$inject = [ '$uibModalInstance', 'teacherFactory', 'items','$scope' ];
	TeacherModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'teacher', '$scope', 'teacherFactory','localStorageService','ApiEndpoint','$filter' ];

	/* @ngInject */
	function TeacherController($state, teacherFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			teachers : [],
			view : view,
			add : add,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadTeachers();
		})();

		// ******************************************************

		function loadTeachers() {
			teacherFactory.getTeachers().then(function(data) {
				vm.teachers = data;
				console.log(JSON.stringify(vm.teachers));
			});
			
		}
		
		function delet(teacher){
			teacherFactory.deleteTeacher(teacher).then(function(){
				loadTeachers();
			});
		}

		function view(teacher) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/teacher/teacherModelView.html',
				controller : 'TeacherModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return teacher;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(teacher) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/teacher/teacherModelDelet.html',
				controller : 'TeacherModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return teacher;
					}
				}
			});

			modalInstance.result.then(function() {
				loadTeachers();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(teacher) {
			var tea = teacher ? teacher : {};
			//alert(JSON.stringify(cust));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/teacher/teacherModelAddEdit.html',
				controller : 'TeacherModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'lg',
				resolve : {
					teacher : function() {
						return tea;
					}
				}
			});

			modalInstance.result.then(function() {
				loadTeachers();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function TeacherModalCtrl($uibModalInstance, teacherFactory,items, $scope) {
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

		function delet(teacher){
			teacherFactory.deleteTeacher(teacher).then(function(){
				$uibModalInstance.close();
				loadTeachers();
			});
		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function TeacherModalAddEditCtrl($uibModalInstance, $uibModal,teacher, $scope , teacherFactory,localStorageService,ApiEndpoint,$filter) {
	   var date= new Date();
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		//var student_code = "1";
	/*	var stu = "STU";*/
		var vm = angular.extend(this, {
			teacher:[],
			//studentCode : studentCode,
		    ok : ok,
		    cancel : cancel,
		
		});

		(function activate() {
			$scope.teacher = teacher;
			
			
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
		/*function addZ(n) {
			return n < 10 ? '0' + n : '' + n;
		}

		function studentNoGen() {
			var date = new Date();

			var year = date.getFullYear() % 100;
			var month = addZ(date.getMonth()) + 1;
			var day = addZ(date.getDay()) + 1;
			var hr = addZ(date.getHours());
			var min = addZ(date.getMinutes());
			var sec = addZ(date.getSeconds());
			//var chal = 'CH';

			student_code = year + '' + month + '' + day + '' + hr + '' + min + ''
					+ sec;
			return student_code;
		}
	}*/
		/*function studentCode(){
			var last=student.lname;
			var fname=first.substring(0, 2);
			var fname1= fname.toUpperCase();
			var lname=last.substring(0, 2);
			var lname1= lname.toUpperCase();
			var strcode=fname1+lname1;
			var studentCode = null;
			var digitCode = 0;
			studentFactory.getStudent().then(function(data) {
				vm.student = data;
				console.log(JSON.stringify(vm.student));
				if(vm.student==null){
					studentCode = strcode+"0001";
				}else{
					console.log("student Code:"+vm.student.student_code);
					digitCode = vm.student.student_code.substr(6,10);
					digitCode= 1+digitCode;
					console.log("DigitCode Value:"+digitCode);
					digitCode++;
					console.log("DigitCode Value:"+digitCode);
					studentCode = strcode+digitCode;
					$scope.student_code = $filter('uppercase')(studentCode)
					console.log("generated Account Code:"+acctCode);
				}
			});
			
		}*/
		
/*		function studentCode(){
			//console.log("Account Category:"+JSON.stringify(account.accountCategory));
			console.log("Student  First Name 2 Letter:"+student.fname.substr(0,2));
			console.log("Student Last Name 2 Letter:"+student.lname.substr(0,2));
			
			var charCode = student.fname.substr(0,2)+student.lname.substr(0,2);
			var stuCode = null;
			var digitCode = 0;
			console.log(charCode);
			//console.log("Account Category Name:"+account.accountCategory.account_category_id.value);
			studentFactory.getStudent().then(function(data) {
				vm.student = data;
				console.log(JSON.stringify(vm.student));
				if(vm.student==null){
					stuCode = charCode+"0001";
				}else{
					console.log("Student Code:"+vm.student.student_code);
					digitCode = vm.student.student_code.substr(4,8);
					digitCode= 1+digitCode;
					console.log("DigitCode Value:"+digitCode);
					digitCode++;
					console.log("DigitCode Value:"+digitCode);
					stuCode = charCode+digitCode.toString().substr(1,4);
					$scope.student_code = $filter('uppercase')(stuCode)
					console.log("generated Student Code:"+stuCode);
				}
			});
			
		//	$scope.account_code= acctCode;
		}*/

		function ok(teacher) {
			//var std = {};
			
			
		/*	student.student_code = studentNoGen();*/
			teacher.upd_datetime= new Date();
			teacher.upd_user_id=userDetail.user_id;
			/*console.log(JSON.stringify(customer));*/
			teacherFactory.addTeacher(teacher).then(function(){
				$uibModalInstance.close(teacher);
			
			});
			
			
		
		}
		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
