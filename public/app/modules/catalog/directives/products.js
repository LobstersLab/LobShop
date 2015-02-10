'use strict';

angular.module('catalog')
    .directive('products', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/catalog/views/products.html',
            controller: 'ProductsController',
            controllerAs: 'productsCtrl'
        };
    });