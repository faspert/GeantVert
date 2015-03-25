'use strict';


/**
 * Déclaration de l'application gardenApp
 */
var gardenApp = angular.module('gardenApp', [
    //Dependencies
    'ngCookies',
    'ngResource',
    'ngRoute'
]);

/**
 *  Routing
 * 
 */
gardenApp.config(['$routeProvider','$locationProvider',
    function ($routeProvider,$locationProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: '/partials/login.html',
                    controller: 'LoginCtrl'
                }).
                when('/signup', {
                    templateUrl: '/partials/signup.html',
                    controller: 'SignupCtrl'
                }).
                when('/dashboard',{
                    templateUrl: '/dashboard.html',
                    controller: 'DashboardCtrl'
                }).
                otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    }]);

gardenApp.run(['$rootScope',function($rootScope){
        
$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
  console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
});
$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
  console.log('$stateChangeError - fired when an error occurs during transition.');
  console.log(arguments);
});
$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
});
// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//   // runs on individual scopes, so putting it in "run" doesn't work.
//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
// });
$rootScope.$on('$viewContentLoaded',function(event){
  console.log('$viewContentLoaded - fired after dom rendered',event);
});
$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
  console.log(unfoundState, fromState, fromParams);
});
}]);
