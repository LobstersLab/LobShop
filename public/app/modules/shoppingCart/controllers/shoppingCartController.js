'use strict';

angular.module('shoppingCart')
    .controller('ShoppingCartController', ['ngDialog',
        function ShoppingCartController (ngDialog) {
            var self = this;

            self.items = [];

            self.putItemInShoppingCart = function (item) {
                if (item) {
                    items.push(item);
                }
            };

            self.removeItemFromShoppingCart = function (item) {
                if (item) {
                    var indexToRemove = self.items.indexOf(item);
                    self.items.splice(1, indexToRemove);
                }
            };

            self.getTotal = function () {
                var total;

                items.forEach(function (item) {
                    if (item.price) {
                        total += item.price;
                    }
                });

                return total;
            };

            self.getCount = function () {
                return self.items.length;
            };

            self.openCheckoutDialog = function () {
                ngDialog.open({
                    template: 'app/modules/shoppingCart/views/checkoutDialog.html',
                    controller: 'CheckoutDialogController',
                    overlay: true,
                    showClose: true
                });
            };
        }
    ]);