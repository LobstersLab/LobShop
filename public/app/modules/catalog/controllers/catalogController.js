'use strict';

angular.module('catalog')
    .controller('CatalogController', ['$state', 'ProductsResource', 'ShoppingCart',
        function CatalogController ($state, ProductsResource, ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
            self.products = ProductsResource.getAllProducts();

            self.openProductDetails = function (product) {
                $state.go('product', {
                    productId: product._id
                });

                product.hover = false;
            };

            self.hoverProduct = function (product) {
                product.hover = true;
            };

            self.unhoverProduct = function (product) {
                product.hover = false;
            };

            self.lastPageYOffset = 0;
        }
    ]);