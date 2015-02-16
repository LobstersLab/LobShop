'use strict';

angular.module('shoppingCart')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('shoppingCart', {
                url: '/shoppingCart',
                templateUrl: 'app/modules/shoppingCart/views/shoppingCart.html',
                controller: 'ShoppingCartController',
                controllerAs: 'shoppingCartCtrl'
            });
    }]);