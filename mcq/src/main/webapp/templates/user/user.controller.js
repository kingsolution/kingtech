(function() {
	'use strict';

	angular.module('myApp.user').controller('UserController', UserController)
			.controller('UserModalCtrl', UserModalCtrl).controller(
					'UserModalAddEditCtrl', UserModalAddEditCtrl);

	UserController.$inject = [ '$state', 'userFactory', '$uibModal', '$log',
			'$scope', 'toastr' , 'localStorageService', 'ApiEndpoint'];
	UserModalCtrl.$inject = [ '$uibModalInstance','userFactory', 'items', '$scope' ];
	UserModalAddEditCtrl.$inject = [ '$uibModalInstance', 'user', '$scope', 'userFactory','studentFactory','teacherFactory','localStorageService', 'ApiEndpoint' ];

	/* @ngInject */
	function UserController($state, userFactory, $uibModal, $log, $scope, toastr, localStorageService, ApiEndpoint) {
		
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user : [],
			view : view,
			add : add,
			active : active,
			deletConfirm : deletConfirm
		});

		(function activate() {
			loadUsers();
		})();

		// ******************************************************

		function loadUsers() {
			userFactory.getUsers().then(function(data) {
				vm.users = data;
				console.log(JSON.stringify(vm.users));
			});
		}
		
		function delet(user){
			userFactory.deleteUser(user).then(function(){
				loadUsers();
			});
		}
		
		function active(user){
			userFactory.active(user).then(function(){
				loadUsers();
			});
		}

		function view(user) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/user/userModelView.html',
				controller : 'UserModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return user;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(user) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/user/userModelDelet.html',
				controller : 'UserModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return user;
					}
				}
			});

			modalInstance.result.then(function() {
				loadUsers();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(user) {
			var usr = user ? user : {};
			// alert(JSON.stringify(usr));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/user/userModelAddEdit.html',
				controller : 'UserModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'lg',
				resolve : {
					user : function() {
						return usr;
					}
				}
			});

			modalInstance.result.then(function() {
				loadUsers();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function UserModalCtrl($uibModalInstance, userFactory,items, $scope) {
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

		function delet(user){
			userFactory.deleteUser(user).then(function(){
				$uibModalInstance.close();
				loadUsers();
			});
		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function UserModalAddEditCtrl($uibModalInstance, user, $scope, userFactory,studentFactory,teacherFactory, localStorageService, ApiEndpoint) {
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			ok : ok,
			cancel : cancel,
			roles : [],
			userDetails : userDetails,
			userTypes: [],
			students :[],
			teachers :[],
			/*consultants : [],
			farms:[],*/
		});

		(function activate() {
			$scope.user = user;
			loadRoles();
			loadUserTypes();
			loadStudents();
			loadTeachers();
		})();

		// ******************************************************
		
		function loadRoles(){	
			userFactory.getRoles().then(function(data){
				vm.roles = data;
			});			
		}
		
		function loadUserTypes(){
			userFactory.getUserTypes().then(function(data){
				vm.userTypes = data;
				console.log(JSON.stringify(vm.userTypes));
			});			
		}
		
		function loadStudents() {
			studentFactory.getStudents().then(function(data) {
				vm.students = data;
				console.log(JSON.stringify(vm.students));
			});
			
		}
		
		function loadTeachers() {
			teacherFactory.getTeachers().then(function(data) {
				vm.teachers = data;
				console.log(JSON.stringify(vm.teachers));
			});
			
		}
		function userDetails(){
			if($scope.user.userType.user_type_id=='2'){
				angular.forEach(vm.teachers, function(teacher, key){
					if($scope.user.usertype_spe_id==teacher.teacher_id){
						console.log("Acount Holder Name:"+teacher.fname)
						$scope.user.fname = teacher.fname;
						$scope.user.lname = teacher.lname;
						$scope.user.mobile_no = teacher.mob_no;
						$scope.user.email = teacher.email;
						$scope.user.gender = teacher.gender;
						$scope.user.address = teacher.address;
					}
				});
			}else if($scope.user.userType.user_type_id=='3'){
				angular.forEach(vm.students, function(student, key){
					if($scope.user.usertype_spe_id==student.student_id){
						console.log("Acount Holder Name:"+student.fname)
						$scope.user.fname = student.fname;
						$scope.user.lname = student.lname;
						$scope.user.mobile_no = student.mob_no;
						$scope.user.email = student.email_id;
						$scope.user.gender = student.gender;
						$scope.user.address = student.address;
					}
				});
			}
		}
		
		
		function ok(user) {
			
			user.upd_datetime=new Date();
			user.upd_user_id= userDetail.user_id;
			console.log(JSON.stringify(user));
			userFactory.addUser(user).then(function(){
				$uibModalInstance.close(user);
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
