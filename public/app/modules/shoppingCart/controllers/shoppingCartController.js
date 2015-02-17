'use strict';

angular.module('shoppingCart')
    .controller('ShoppingCartController', ['CartService',
        function ShoppingCartController (CartService) {
            var self = this;

            self.cart = CartService;
        }
    ]);