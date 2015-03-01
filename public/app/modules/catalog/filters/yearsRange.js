'use strict';

angular.module('catalog')
    .filter('yearsRange', [
        function() {
            return function(items, minYear, maxYear) {
                var filtered = [];

                angular.forEach(items, function(item) {
                    var year = parseInt(item.years);

                    if(year >= minYear && year <= maxYear) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        }
    ]);