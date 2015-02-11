'use strict';

angular.module('users')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('profile', {
                url: '/profile',
                templateUrl: 'app/modules/users/views/profile.html',
                controller: 'ProfileController',
                controllerAs: 'profileCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/modules/users/views/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/modules/users/views/register.html',
                controller: 'RegisterController',
                controllerAs: 'registerCtrl'
            });
    }]);