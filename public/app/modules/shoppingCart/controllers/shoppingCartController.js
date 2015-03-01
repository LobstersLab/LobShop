'use strict';

angular.module('shoppingCart')
    .controller('ShoppingCartController', ['ShoppingCart',
        function ShoppingCartController (ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
        }
    ]);