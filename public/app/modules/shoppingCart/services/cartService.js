'use strict';

angular.module('shoppingCart')
    .factory('ShoppingCart', ['$window','$http',
        function ($window, $http) {
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

            function checkoutOrder (formData) {
                //Gather items ids
                var items = getItems(),
                    itemIds = [],
                    i = 0;
                debugger
                while(items.length > i){
                    itemIds.push(items[i].id)
                    i++;
                };
                //Attach items to the form data
                formData.items = itemIds;

                $http.post('/api/orders', formData).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }

            return {
                getItems: getItems,
                getCount: getCount,
                getTotal: getTotal,
                insertItem: insertItem,
                removeItem: removeItem,
                checkoutOrder : checkoutOrder
            };
        }
    ]);