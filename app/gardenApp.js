'use strict';


/**
 * Déclaration de l'application gardenApp
 */
var gardenApp = angular.module('gardenApp', ['ngResource']
    // Dépendances du "module"
);

/**
 *  Routing
 * 
 */
gardenApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginCtrl'
                }).
                when('/signup', {
                    templateUrl: 'partials/signup.html',
                    controller: 'SignupCtrl'
                }).
                otherwise({
                    redirectTo: '/login'
                });
    }]);
/**
 * Contrôleur de l'application".
 */
//gardenApp.controller('MyController',['$scope'],function)

