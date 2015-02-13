'use strict';

angular.module('dashboard')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.
            state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/modules/dashboard/views/dashboard.html',
                controller: 'DashboardMainController',
                controllerAs: 'dashboardCtrl'
            })
    }]);