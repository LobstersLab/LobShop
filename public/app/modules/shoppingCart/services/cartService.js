'use strict';

angular.module('shoppingCart')
    .factory('CartService', [function () {
        var self = this;

        self.items = [1, 2, 3];

        function getItems () {
            return self.items;
        }

        function getCount () {
            return self.items.length;
        }

        function getTotal () {
            var total;

            items.forEach(function (item) {
                if (item.price) {
                    total += item.price;
                }
            });

            return total;
        }

        function insertItem (item) {
            if (item) {
                items.push(item);
            }
        }

        function removeItem (item) {
            if (item) {
                var indexToRemove = self.items.indexOf(item);
                self.items.splice(1, indexToRemove);
            }
        }

        return {
            getItems: getItems,
            getCount: getCount,
            getTotal: getTotal,
            insertItem: insertItem,
            removeItem: removeItem
        };
    }]);