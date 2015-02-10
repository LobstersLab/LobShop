'use strict';

angular.module('catalog')
    .directive('catalog', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/catalog/views/catalog.html',
            controller: 'CatalogController',
            controllerAs: 'catalogCtrl'
        };
    });