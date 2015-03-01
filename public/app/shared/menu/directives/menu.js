'use strict';

angular.module('menu')
    .directive('menu', [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/menu/views/menu.html',
            controller: 'MenuController',
            controllerAs: 'menuCtrl'
            //transclude: true,
            //scope: {
            //    //visible: "=",
            //    alignment: "@"
            //}
        };
    }]);