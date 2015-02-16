'use strict';

angular.module('product')
    .directive('searchHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/product/views/searchHeader.html',
            controller: 'SearchHeaderController',
            controllerAs: 'searchHeaderCtrl'
        };
    });