(function() {
	'use strict';

	angular.module('myApp.student').controller('StudentController',StudentController)
			.controller('StudentModalCtrl', StudentModalCtrl).controller(
					'StudentModalAddEditCtrl', StudentModalAddEditCtrl);

	StudentController.$inject = [ '$state', 'studentFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	StudentModalCtrl.$inject = [ '$uibModalInstance', 'studentFactory', 'items','$scope' ];
	StudentModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'student', '$scope', 'studentFactory','localStorageService','ApiEndpoint','$filter' ];

	/* @ngInject */
	function StudentController($state, studentFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			students : [],
			view : view,
			add : add,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadStudents();
		})();

		// ******************************************************

		function loadStudents() {
			studentFactory.getStudents().then(function(data) {
				vm.students = data;
				console.log(JSON.stringify(vm.students));
			});
			
		}
		
		function delet(student){
			studentFactory.deleteStudent(student).then(function(){
				loadStudents();
			});
		}

		function view(student) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/student/studentModelView.html',
				controller : 'StudentModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return student;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(student) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/student/studentModelDelet.html',
				controller : 'StudentModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return student;
					}
				}
			});

			modalInstance.result.then(function() {
				loadStudents();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(student) {
			var stu = student ? student : {};
			//alert(JSON.stringify(cust));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/student/studentModelAddEdit.html',
				controller : 'StudentModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'lg',
				resolve : {
					student : function() {
						return stu;
					}
				}
			});

			modalInstance.result.then(function() {
				loadStudents();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function StudentModalCtrl($uibModalInstance, studentFactory,items, $scope) {
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

		function delet(student){
			studentFactory.deleteStudent(student).then(function(){
				$uibModalInstance.close();
				loadStudents();
			});
		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function StudentModalAddEditCtrl($uibModalInstance, $uibModal,student, $scope , studentFactory,localStorageService,ApiEndpoint,$filter) {
	   var date= new Date();
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		//var student_code = "1";
	/*	var stu = "STU";*/
		var vm = angular.extend(this, {
			student:[],
			studentCode : studentCode,
		    ok : ok,
		    cancel : cancel,
		
		});

		(function activate() {
			$scope.student = student;
			
			
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
		
		function studentCode(){
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
		}

		function ok(student) {
			//var std = {};
			
			
		/*	student.student_code = studentNoGen();*/
			student.upd_datetime= new Date();
			student.upd_user_id=userDetail.user_id;
			student.active= 1;
			/*console.log(JSON.stringify(customer));*/
			studentFactory.addStudent(student).then(function(){
				$uibModalInstance.close(student);
			
			});
			
			
		
		}
		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
