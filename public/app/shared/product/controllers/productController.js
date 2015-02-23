'use strict';

angular.module('product')
    .controller('ProductController', ['$stateParams', 'ProductsResource', 'ShoppingCart',
        function ProductController ($stateParams, ProductsResource, ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
            self.productId = $stateParams.productId;
            self.relatedProducts = ProductsResource.getAllProducts();

            ProductsResource.getProductById(self.productId)
                .then(function (product) {
                    self.product = product;
                }, function (error) {

                });
        }
    ]);