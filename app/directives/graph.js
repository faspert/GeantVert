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
            template: '<div id="graphdiv"></div>',

            link: function (scope, element, attrs) {  //DOM manipulation

                console.log('testing the stuff');

                var g = new Dygraph(element.children()[0], [[0,0]], {
                    title: 'Temperature / Humidite',
                });

                scope.$watch("data", function () {

                    console.log('scope changes');
                    var options = scope.options;
                    if (options === undefined) {
                        options = {};
                    }
                    //do not update if data is empty
                    if (scope.data.length != 0)
                        options.file = scope.data;

                    console.log(scope.data)
                    g.updateOptions(options);
                    g.resetZoom();

                    g.resize();

                }, true);
            }
        }
    });