'use strict';

angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        //$stateProvider.
        //    state('home', {
        //        url: '/',
        //        templateUrl: 'template/url',
        //        controller: 'Controller',
        //        controllerAs: 'Ctrl'
        //    });
    }]);