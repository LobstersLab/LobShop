'use strict';

angular.module('users')
    .config(['$stateProvider', '$urlRouterProvider', 'RoutePermissionsProvider',
        function ($stateProvider, $urlRouterProvider, RoutePermissionsProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.
                state('profile', {
                    url: '/profile',
                    templateUrl: 'app/modules/users/views/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'profileCtrl',
                    resolve: RoutePermissionsProvider.isAuthenticated
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/modules/users/views/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl'
                })
                .state('forgottenPassword', {
                    url: '/forgot-password',
                    templateUrl: 'app/modules/users/views/login/forgottenPassword.html',
                    controller: 'ForgottenPasswordController',
                    controllerAs: 'forgottenPasswordCtrl'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'app/modules/users/views/register/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'registerCtrl'
                })
                .state('register.personal', {
                    url: '/personal',
                    templateUrl: 'app/modules/users/views/register/register-personal.html'
                })
                .state('register.details', {
                    url: '/details',
                    templateUrl: 'app/modules/users/views/register/register-details.html'
                })
                .state('register.account', {
                    url: '/account',
                    templateUrl: 'app/modules/users/views/register/register-account.html'
                });
        }
    ]);