'use strict';

angular.module('catalog')
    .filter('priceRange', [
        function() {
            return function(items, minPrice, maxPrice) {
                var filtered = [];

                angular.forEach(items, function(item) {
                    var price = parseFloat(item.price.value);

                    if(price >= minPrice && price <= maxPrice) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        }
    ]);