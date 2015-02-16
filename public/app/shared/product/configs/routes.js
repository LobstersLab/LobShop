'use strict';

angular.module('product')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.
            state('product', {
                url: '/products/:productId',
                templateUrl: 'app/shared/product/views/product.html',
                controller: 'ProductController',
                controllerAs: 'productCtrl'
            });
    }]);