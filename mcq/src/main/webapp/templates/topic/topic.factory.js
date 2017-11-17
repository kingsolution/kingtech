(function() {
	'use strict';

	angular
		.module('myApp.topic')
		.factory('topicFactory', topicFactory);

	topicFactory.$inject = ['topicHttpFactory', '$q', 'toastr'];
	
	/* @ngInject */
	function topicFactory(topicHttpFactory, $q, toastr) {
		var factory = {			
			getAll : getAll,
			delet : delet,
			add : add,
		};
		return factory;

		// ***************************************************************

		
		
		function getAll() {
			var deferred = $q.defer();
			topicHttpFactory.getAll().then(function(response){
				deferred.resolve(response);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		function delet(topic){
			var deferred = $q.defer();
			topicHttpFactory.delet(topic).then(function(response){
				toastr.success('Topic Deleted....', 'Succesful !!');
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function add(topic){
			var deferred = $q.defer();
			topicHttpFactory.add(topic).then(function(response){
				toastr.success('Topic Added....', 'Succesful !!');
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
	}

})();