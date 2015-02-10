'use strict';

angular.module('catalog')
    .directive('catalogHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/catalog/views/catalogHeader.html',
            controller: 'CatalogHeaderController',
            controllerAs: 'catalogHeaderCtrl'
        };
    });