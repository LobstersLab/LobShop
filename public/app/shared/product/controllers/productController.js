'use strict';

angular.module('product')
    .controller('ProductController', ['$stateParams', 'ProductsResource',
        function ProductController ($stateParams, ProductsResource) {
            var self = this;

            self.productId = $stateParams.productId;
            self.product = ProductsResource.getProductById(self.productId);
            self.relatedProducts = ProductsResource.getAllProducts();
        }
    ]);