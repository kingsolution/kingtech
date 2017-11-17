(function() {
	'use strict';

	angular.module('myApp.topic').controller('TopicController', TopicController)
			.controller('TopicModalCtrl', TopicModalCtrl).controller(
					'TopicModalAddEditCtrl', TopicModalAddEditCtrl);

	TopicController.$inject = [ '$state', 'topicFactory', '$uibModal', '$log',
			'$scope', 'toastr' ];
	TopicModalCtrl.$inject = [ '$uibModalInstance', 'items','topicFactory', '$scope' ];
	TopicModalAddEditCtrl.$inject = [ '$uibModalInstance','$uibModal', 'topic', '$scope', 'topicFactory','subjectFactory','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function TopicController($state, topicFactory, $uibModal, $log, $scope, toastr) {
		var vm = angular.extend(this, {
			topics : [],
			view : view,
			add : add,
			deletConfirm : deletConfirm 
		});

		(function activate() {
			loadTopics();
		})();

		// ******************************************************

		function loadTopics() {
			topicFactory.getAll().then(function(response) {
				vm.topics = response.data;
				console.log(JSON.stringify(vm.topics));
			});
			
		}
		
		function delet(topic){
			topicsFactory.delet(topic).then(function(){
				loadTopics();
			});
		}

		function view(topic) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/topic/topicModelView.html',
				controller : 'TopicModalCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					items : function() {
						return topic;
					}
				}
			});

			modalInstance.result.then(function() {
				
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		function deletConfirm(topic) {
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/topic/topicModelDelet.html',
				controller : 'TopicModalCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					items : function() {
						return topic;
					}
				}
			});

			modalInstance.result.then(function() {
				loadTopics();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		function add(topic) {
			var sub = topic ? topic : {};
		/*	alert(JSON.stringify(sub));*/
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/topic/topicModelAddEdit.html',
				controller : 'TopicModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'sm',
				resolve : {
					topic : function() {
						return sub;
					}
				}
			});

			modalInstance.result.then(function() {
				loadTopics();
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

	}

	function TopicModalCtrl($uibModalInstance, items,topicFactory, $scope) {
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

		 function delet(topic){
			 topicFactory.delet(topic).then(function(){
				 $uibModalInstance.close();
				});
          }
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}

	function  TopicModalAddEditCtrl($uibModalInstance,$uibModal, topic, $scope , topicFactory,subjectFactory,localStorageService,ApiEndpoint) {
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			subjects:[],
			addSubject:addSubject,
			ok : ok,
			cancel : cancel,
		});

		(function activate() {
			$scope.topic = topic;
			loadSubjects();
		})();

		// ******************************************************
		/*function loadSubjects() {
			subjectFactory.getSubjects().then(function(response) {
				vm.subjects = response.data;
				console.log(JSON.stringify(vm.subjects));
				console.log(JSON.stringify(response.data));
			});
		}*/
		
		function loadSubjects() {
			subjectFactory.getSubjects().then(function(data) {
				vm.subjects = data;
				console.log(JSON.stringify(vm.subjects));
			});
		}
		
		function addSubject(subject) {
			var sub = subject? subject: {};
			// alert(JSON.stringify(usr));
			var modalInstance = $uibModal.open({
				animation : true,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : 'templates/subject/subjectModelAddEdit.html',
				controller : 'SubjectModalAddEditCtrl',
				controllerAs : 'vm',
				size : 'md',
				resolve : {
					subject: function() {
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
		
		
		function ok(topic) {
		
			console.log(JSON.stringify(topic));
			topic.upd_datetime= new Date();
			topic.upd_user_id=userDetail.user_id;
			topic.active= 1;
			topicFactory.add(topic).then(function(){
				$uibModalInstance.close(topic);
			});
		}
		
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();
