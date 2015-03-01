'use strict';

angular.module('catalog')
    .directive('filter', [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/catalog/views/filter.html',
            controller: 'FilterController',
            controllerAs: 'filterCtrl'
        };
    }]);