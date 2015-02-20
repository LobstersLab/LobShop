'use strict';

angular.module('catalog')
    .controller('CatalogController', ['$state', 'ProductsResource', 'ShoppingCart',
        function CatalogController ($state, ProductsResource, ShoppingCart) {
            var self = this;

            self.products = ProductsResource.getAllProducts();

            self.addProductToShoppingCart = function (product) {
                if (product) {
                    ShoppingCart.insertItem(product);
                }
            };

            self.openProductDetails = function (product) {
                $state.go('product', {
                    productId: product.id
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