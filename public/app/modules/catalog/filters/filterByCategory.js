'use strict';

angular.module('catalog')
    .filter('filterByCategory', [
        function() {
            return function(items, categoryId) {
                if (!categoryId) {
                    return items;
                }

                var filtered = [];

                angular.forEach(items, function(item) {
                    if(item.category.indexOf(categoryId) > -1) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        }
    ]);