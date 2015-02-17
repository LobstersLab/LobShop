'use strict';

angular.module('shoppingCart')
    .controller('ShoppingCartSummaryController', ['CartService',
        function ShoppingCartSummaryController (CartService) {
            var self = this;

            self.cart = CartService;
        }
    ]);