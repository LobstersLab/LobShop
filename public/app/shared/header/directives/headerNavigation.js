'use strict';

angular.module('header')
    .directive('headerNavigation', function headerNavigation () {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/header/views/header-navigation.html',
        controller: 'HeaderController',
        controllerAs: 'headerCtrl'
    };
});