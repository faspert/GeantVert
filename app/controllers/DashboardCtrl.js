/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('gardenApp')
    .controller('DashboardCtrl', function ($scope, $cookieStore) {
        console.log('Fetching Data for user: ',$cookieStore.get('username'));

    });

