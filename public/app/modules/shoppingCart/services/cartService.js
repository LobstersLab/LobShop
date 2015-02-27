'use strict';

angular.module('shoppingCart')
    .factory('ShoppingCart', ['$rootScope', '$window', '$http', 'Identity',
        function ($rootScope, $window, $http, Identity) {
            var self = this;
            var SHOPPING_CART_ITEMS_STORAGE = 'ShoppingCartItems';

            self.cartItems = getStorageItems() || [];

            $rootScope.$on('logout', function () {
                self.cartItems = getStorageItems() || [];
            });

            $rootScope.$on('login', function () {
                self.cartItems = getStorageItems() || [];
            });

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
                if (!Identity.getCurrentUser()) {
                    return;
                }

                var currentUserId = Identity.getCurrentUser().id;
                var storage = JSON.parse($window.localStorage.getItem(SHOPPING_CART_ITEMS_STORAGE));

                if (!storage) {
                    return null;
                } else {
                    var storageItems = storage.filter(function (userItems) {
                        return userItems.userId === currentUserId;
                    })[0].items;

                    return storageItems;
                }
            }

            function setStorageItems () {
                if (!Identity.getCurrentUser()) {
                    return;
                }

                var currentUserId = Identity.getCurrentUser().id;
                var storage = JSON.parse($window.localStorage.getItem(SHOPPING_CART_ITEMS_STORAGE)) || [];
                var currentUserItems = storage.filter(function (userItems) {
                    return userItems.userId === currentUserId;
                })[0];

                if (currentUserItems) {
                    var currentUserItemsIndex = storage.indexOf(currentUserItems);
                    currentUserItems.items = self.cartItems;

                    storage[currentUserItemsIndex] = currentUserItems;
                } else {
                    storage.push({
                        userId: currentUserId,
                        items: self.cartItems
                    });
                }

                $window.localStorage.setItem(SHOPPING_CART_ITEMS_STORAGE, JSON.stringify(storage));
            }

            function checkoutOrder (formData) {

                //Gather items ids
                var items = getItems(),
                    itemIds = [],
                    i = 0;

                while(items.length > i){
                    itemIds.push(items[i].id);
                    i++;
                }

                //Attach items to the form data
                formData.items = itemIds;

                $http.post('/api/orders', formData).
                    success(function(data, status, headers, config) {
                        //TODO: Redirect to the 'Congratulations' state
                    }).
                    error(function(data, status, headers, config) {
                        //TODO: Show error message
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