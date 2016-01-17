'use strict';

angular.module('gardenApp')
        .factory('Session', function ($resource) {
            return $resource('/auth/session/');
        });

angular.module('gardenApp')
    .factory('Registration',function($resource) {
            return $resource('/registration');
    });
