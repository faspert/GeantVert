'use strict';


/**
 * Déclaration de l'application gardenApp
 */
var gardenApp = angular.module('gardenApp', [
    //Dependencies
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
                otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    }]);

