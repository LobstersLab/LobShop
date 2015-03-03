'use strict';

angular.module('catalog')
    .filter('filterByAge', [
        function() {
            return function(items, age) {
                if (!age) {
                    return items;
                }

                var filtered = [];

                angular.forEach(items, function(item) {
                    if(item.age === age) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        }
    ]);