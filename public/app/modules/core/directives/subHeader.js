'use strict';

angular.module('core')
    .directive('subHeader', [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/core/views/subHeader.html',
            controller: 'SubHeaderController',
            controllerAs: 'subHeaderCtrl'
        };
    }]);