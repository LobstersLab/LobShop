'use strict';

angular.module('shoppingCart')
    .directive('shoppingCartSummary', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/shoppingCart/views/shoppingCartSummary.html',
            controller: 'ShoppingCartSummaryController',
            controllerAs: 'shoppingCartSummaryCtrl'
        };
    });