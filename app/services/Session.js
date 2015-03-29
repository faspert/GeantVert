/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

angular.module('gardenApp')
        .factory('Session', function ($resource) {
            return $resource('/auth/session/');
        });

angular.module('gardenApp')
    .factory('Registration',function($resource) {
            return $resource('/registration');
    });
