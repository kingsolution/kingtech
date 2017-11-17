angular.module('myApp', [
	'ui.router',
	'LocalStorageModule',
	'ui.bootstrap',
	'toastr',
	'ngCookies',
	'ngRoute',
	
	'myApp.main',
	'myApp.home',
	'myApp.user',
	'myApp.student',	
	'myApp.subject',
	'myApp.teacher',
	'myApp.course',
	'myApp.exam',
	'myApp.question',
	'myApp.login',
	'myApp.topic',
])

.value('_', window._)

.constant('ApiEndpoint', {
  url: 'http://localhost:8080/mcq/api/',// http://162.251.83.105/
  userKey : 'mcq'
})
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }else if($location.path() == '/login' && $rootScope.globals.currentUser){
            	$location.path('/main/home');
            }
        });
    }])

.config(function($urlRouterProvider,$locationProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/main/home');
	 // use the HTML5 History API
	 $locationProvider.hashPrefix('');
}); 