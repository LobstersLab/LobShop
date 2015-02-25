'use strict';

angular.module('shoppingCart')
    .factory('ShoppingCart', ['$window',
        function ($window) {
            var self = this;
            var SHOPPING_CART_ITEMS_STORAGE = 'ShoppingCartItems';

            self.cartItems = getStorageItems() || [];

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
                        total += parseInt(cartItem.item.price.value);
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

                setStorageItems();
            }

            function removeItem (item) {
                if (item) {
                    var itemInCart = self.cartItems.filter(function (i) { return i.id === item._id})[0];
                    var indexOfItem = self.cartItems.indexOf(itemInCart);

                    self.cartItems.splice(indexOfItem, 1);
                }

                setStorageItems();
            }

            function getStorageItems () {
                return JSON.parse($window.localStorage.getItem(SHOPPING_CART_ITEMS_STORAGE));
            }

            function setStorageItems () {
                $window.localStorage.setItem(SHOPPING_CART_ITEMS_STORAGE, JSON.stringify(self.cartItems));
            }

            return {
                getItems: getItems,
                getCount: getCount,
                getTotal: getTotal,
                insertItem: insertItem,
                removeItem: removeItem
            };
        }
    ]);