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
                when('/logout', {
                    template: '',
                    controller: 'LogoutCtrl'
                 }).
                when('/signup', {
                    templateUrl: '/partials/signup.html',
                    controller: 'SignupCtrl'
                }).
                when('/dashboard',{
                    templateUrl: '/partials/dashboard.html',
                    controller: 'DashboardCtrl'
                }).
                when('/dashboard/calendar',{
                templateUrl: '/partials/calendar.html',
                controller: 'CalendarCtrl'
            }).
                otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    }]);
