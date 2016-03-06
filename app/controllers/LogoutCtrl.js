/**
 * Created by Francois on 06.03.2016.
 */
'use strict';


angular.module('gardenApp')
    .controller('LogoutCtrl',  function ($scope, Auth) {

        $scope.logout = function () {
            console.log('logging out');
            Auth.logout(function (err) {
                if (!err) {
                    window.location = '/';
                } else {
                    console.log('cannot log out')
                }
            });
        };
    });