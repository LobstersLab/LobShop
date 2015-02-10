'use strict';

angular.module('catalog')
    .directive('shoppingCartSummary', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/catalog/views/shoppingCartSummary.html',
            controller: 'ShoppingCartSummaryController',
            controllerAs: 'shoppingCartSummaryCtrl'
        };
    });