/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('gardenApp')
    .controller('DashboardCtrl', function ($scope, $cookieStore, Data) {
        $scope.data = [];
        $scope.options = {
            labels: [ 'Date', 'Humidite', 'Temperature' ],
            ylabel: 'Temperature',
            y2label: 'Humidite',
            fillGraph : true,
            series: {
                'Temperature': {
                    axis: 'y2'
                },
            },
            axes: {
                y: {
                    // set axis-related properties here
                    drawGrid: false,
                    independentTicks: true
                },
                y2: {
                    // set axis-related properties here
                    labelsKMB: true,
                    drawGrid: true,
                    independentTicks: true
                }
            }
        };

        //retrieve garden data
        Data.query( function(data) {

            //format data for dygraph display
            // [[TS1 HUM1 TEMP1]
            //  [TS2 HUM2 TEMP2]
            //  ...
            //  [TSN HUMN TEMPN]]

            angular.forEach(data, function(item) {
                console.log(item);
                for (var elem = 0; elem < item['humidity'].length; elem++)
                {
                    var datarow = [];
                    //interval between each sample (10 min for now)
                    var timestamp = moment(item.timestamp);
                    timestamp.add(elem*10,'m');

                    datarow.push(timestamp.toDate());
                    datarow.push(item.humidity[elem]);
                    datarow.push(item.temperature[elem]);
                    $scope.data.push(datarow);
                }

            });
        });

    });

