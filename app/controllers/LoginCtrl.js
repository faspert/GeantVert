/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


angular.module('gardenApp')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
        console.log('This is the login controller');
        $scope.error = {};
        $scope.user = {};
        $scope.login = function (form) {
            Auth.login('password', {
                'email': $scope.user.email,
                'password': $scope.user.password
            },
            function (err) {
                $scope.errors = {};
                if (!err) {
                    $location.path('/');
                } else {
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                    $scope.error.other = err.message;
                }
            });
        };
    });


