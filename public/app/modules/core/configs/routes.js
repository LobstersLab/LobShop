'use strict';

angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/modules/catalog/views/catalog.html',
                controller: 'CatalogController',
                controllerAs: 'catalogCtrl'
            })
            .state('highlights', {
                url: '/highlights',
                templateUrl: 'app/modules/catalog/views/catalog.html',
                controller: 'CatalogController',
                controllerAs: 'catalogCtrl'
            })
            .state('terms', {
                url: '/terms',
                templateUrl: 'app/modules/core/views/terms.html',
                controller: 'TermsController',
                controllerAs: 'termsCtrl'
            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: 'app/modules/core/views/contacts.html',
                controller: 'ContactsController',
                controllerAs: 'contactsCtrl'
            });
    }]);