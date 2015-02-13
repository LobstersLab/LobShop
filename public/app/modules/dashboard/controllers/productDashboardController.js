'use strict';

angular.module('dashboard')
    .controller('ProductDashboardController', ['ProductsResource',
        function(ProductsResource){


            this.products = ProductsResource.getAllProducts();
        }
    ]);