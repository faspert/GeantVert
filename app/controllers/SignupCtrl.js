'use strict';

angular.module('gardenApp')
    .controller('SignupCtrl', function ($scope, Auth, $location) {
        console.log('this is the signup controller');
        $scope.error = {};
        $scope.user = {};
        $scope.signup = function (form) {
            Auth.signup( {
                    'username' : $scope.user.username,
                    'email': $scope.user.email,
                    'password': $scope.user.password
                },
                function (err,responseHeaders) {
                    $scope.errors = {};
                    if (!err) {
                        //$location.path('/dashboard');
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
