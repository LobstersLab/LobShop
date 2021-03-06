'use strict';

angular.module('catalog')
    .filter('yearsRange', [
        function() {
            return function(items, minYear, maxYear) {
                var filtered = [];

                angular.forEach(items, function(item) {
                    var yearsFrom = parseInt(item.yearsFrom);
                    var yearsTo = parseInt(item.yearsTo);

                    if(yearsFrom >= minYear && yearsTo <= maxYear) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        }
    ]);