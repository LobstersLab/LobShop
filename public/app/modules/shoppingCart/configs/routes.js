'use strict';

angular.module('shoppingCart')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('shoppingCart', {
                url: '/shopping-cart',
                templateUrl: 'app/modules/shoppingCart/views/shoppingCart.html',
                controller: 'ShoppingCartController',
                controllerAs: 'shoppingCartCtrl'
            })
            .state('order', {
                url: '/order',
                templateUrl: 'app/modules/shoppingCart/views/order/order.html',
                controller: 'OrderController',
                controllerAs: 'orderCtrl',
                abstract: true
            })
            .state('order.personalInfo', {
                url: '/personal-info',
                templateUrl: 'app/modules/shoppingCart/views/order/personalInfo.html'
            })
            .state('order.deliveryInfo', {
                url: '/delivery-info',
                templateUrl: 'app/modules/shoppingCart/views/order/deliveryInfo.html'
            })
            .state('order.paymentInfo', {
                url: '/payment-info',
                templateUrl: 'app/modules/shoppingCart/views/order/paymentInfo.html'
            })
            .state('order.confirm', {
                url: '/confirm',
                templateUrl: 'app/modules/shoppingCart/views/order/confirm.html'
            });
    }]);