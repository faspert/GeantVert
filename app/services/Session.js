'use strict';

angular.module('gardenApp')
        .factory('Session', function ($resource) {
            return $resource('/auth/session/');
        });

angular.module('gardenApp')
    .factory('Registration',function($resource) {
            return $resource('/registration');
    });

angular.module('gardenApp')
    .factory('Data',function($resource) {
        return $resource('/garden');
    });
