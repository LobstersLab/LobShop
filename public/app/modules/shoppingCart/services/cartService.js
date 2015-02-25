'use strict';

angular.module('shoppingCart')
    .factory('ShoppingCart', [function () {
        var self = this;

        self.cartItems = [];

        function getItems () {
            return self.cartItems;
        }

        function getCount () {
            return self.cartItems.length;
        }

        function getTotal () {
            var total = 0;

            for (var i = 0; i < self.cartItems.length; i++) {
                var cartItem = self.cartItems[i];

                if (cartItem.item.price) {
                    total += cartItem.item.price;
                }
            }

            return total;
        }

        function insertItem (item) {
            if (item) {
                var existingItem = self.cartItems.filter(function (i) { return i.id === item._id})[0];

                if (!existingItem) {
                    var cartItemToInsert = {
                        id: item._id,
                        item: item
                    };

                    self.cartItems.push(cartItemToInsert);
                }
            }
        }

        function removeItem (item) {
            if (item) {
                var itemInCart = self.cartItems.filter(function (i) { return i.id === item._id})[0];
                var indexOfItem = self.cartItems.indexOf(itemInCart);

                self.cartItems.splice(indexOfItem, 1);
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