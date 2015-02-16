'use strict';

angular.module('catalog')
    .controller('CatalogController', ['$state', 'ProductsResource',
        function CatalogController ($state, ProductsResource) {
            var self = this;

            self.products = ProductsResource.getAllProducts();

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