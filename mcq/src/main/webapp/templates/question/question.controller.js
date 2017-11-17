(function() {
	'use strict';

	angular.module('myApp.question').controller('QuestionController',QuestionController)
			.controller('QuestionModalCtrl', QuestionModalCtrl).controller(
					'QuestionModalAddEditCtrl', QuestionModalAddEditCtrl);

	QuestionController.$inject = [ '$state', 'questionFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	QuestionModalCtrl.$inject = [ '$uibModalInstance', 'questionFactory', 'items','$scope' ];
	QuestionModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'question', '$scope', 'questionFactory','topicFactory','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function QuestionController($state, questionFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			questions : [],
			view : view,
			add : add,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadQuestions();
		})();

		// ******************************************************

		function loadQuestions() {
			questionFactory.getQuestions().then(function(data) {
				vm.questions = data;
				console.log(JSON.stringify(vm.questions));
			});
			
		}
		
		function delet(question){
			questionFactory.deleteQuestion(question).then(function(){
				loadQuestions();
			});
		}

		function view(question) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/question/questionModelView.html',
				controller : 'QuestionModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return question;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(question) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/question/questionModelDelet.html',
				controller : 'QuestionModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return question;
					}
				}
			});

			modalInstance.result.then(function() {
				loadQuestions();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(question) {
			var que = question ? question : {};
			//alert(JSON.stringify(cust));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/question/questionModelAddEdit.html',
				controller : 'QuestionModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'lg',
				resolve : {
					question : function() {
						return que;
					}
				}
			});

			modalInstance.result.then(function() {
				loadQuestions();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function QuestionModalCtrl($uibModalInstance, questionFactory,items, $scope) {
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

		function delet(question){
			questionFactory.deleteQuestion(question).then(function(){
				$uibModalInstance.close();
				loadQuestions();
			});
		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function QuestionModalAddEditCtrl($uibModalInstance, $uibModal,question, $scope , questionFactory,topicFactory,localStorageService,ApiEndpoint) {
	   var date= new Date();
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			topics : [],
			addTopic:addTopic,
			ok : ok,
			
			cancel : cancel,
		});

		(function activate() {
			$scope.question = question;
			loadTopics();
			
		})();

		// ******************************************************
		function loadTopics() {
			topicFactory.getAll().then(function(response) {
				vm.topics = response.data;
				console.log(JSON.stringify(vm.topics));
			});
			
		}
		
		function addTopic(topic) {
			var top = topic? topic: {};
			// alert(JSON.stringify(usr));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/topic/topicModelAddEdit.html',
				controller : 'TopicModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					topic: function() {
						return top;
					}
				}
			});

			modalInstance.result.then(function() {
				
				loadtopics();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
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
		

		function ok(question) {
			
			question.upd_datetime= new Date();
			question.upd_user_id=userDetail.user_id;
			/*console.log(JSON.stringify(customer));*/
			questionFactory.addQuestion(question).then(function(){
				$uibModalInstance.close(question);
			});
		}
	
		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
