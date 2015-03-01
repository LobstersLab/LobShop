'use strict';

angular.module('shoppingCart')
    .controller('ShoppingCartSummaryController', ['ShoppingCart',
        function ShoppingCartSummaryController (ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
        }
    ]);