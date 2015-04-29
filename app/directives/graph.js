/**
 * Created by faspert on 28.04.2015.
 */
'use strict';

angular.module('gardenApp')
    .directive('gvDygraph', function () {
        return {
            restrict: 'EAC', //E = element, A = attribute, C = class, M = comment
            scope: true ,   //use parent's scope
            //replace: 'true',  // replace directive by template in html
            template: '<div id="demodiv"></div>',

            link: function ($scope, element, attrs) {  //DOM manipulation

                console.log('testing the stuff');
                function data() {
                    var r = "date,line,another line,sine wave\n";
                    for (var i = 1; i <= 31; i++) {
                        r += "2006/10/" + (i > 10 ? i : "0" + i);
                        r += "," + 10 * (8 * i);
                        r += "," + 10 * (250 - 8 * i);
                        r += "," + 10 * (125 + 125 * Math.sin(0.3 * i));
                        r += "\n";
                    }
                    return r;
                }

                var g = new Dygraph(element.children()[0], data, {
                    title: 'Stacked chart w/ Total',
                    stackedGraph: true,
                    axes: {
                        x: {
                            valueFormatter: function(val, opts, series_name, dygraph) {
                                for (var i = 0; i < dygraph.numRows(); i++) {
                                    if (dygraph.getValue(i, 0) != val) continue;
                                    var total = 0;
                                    for (var j = 1; j < dygraph.numColumns(); j++) {
                                        total += dygraph.getValue(i, j);
                                    }
                                    return Dygraph.dateString_(val) + ' (total: ' + total.toFixed(2) + ')';
                                }
                            }

                        }
                    }
                });
            }
        }
    });