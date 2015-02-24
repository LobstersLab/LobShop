'use strict';

angular.module('dashboard')
    .config(['$stateProvider', '$urlRouterProvider', 'RoutePermissionsProvider',
        function ($stateProvider, $urlRouterProvider, RoutePermissionsProvider) {

            $stateProvider.
                //Main dashboard route
                state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/modules/dashboard/views/dashboard.html',
                    controller: 'DashboardMainController',
                    controllerAs: 'dashboardCtrl',
                    resolve: RoutePermissionsProvider.isAdmin

                    // TODO: Add the abstract property if the main dashboard view will be skipped to prevent
                    //abstract: true
                })

                //Products routes
                .state('dashboard.products', {
                    url: '/products',
                    templateUrl: 'app/modules/dashboard/views/products.html',
                    controller: 'ProductDashboardController',
                    controllerAs: 'productDashboardCtrl'
                })
                .state('dashboard.products.productEdit', {
                    url: '/productEdit',
                    templateUrl: 'app/modules/dashboard/views/product-edit.html'
                })
                .state('dashboard.products.productSearch', {
                    url: '/productEdit',
                    templateUrl: 'app/modules/dashboard/views/product-list.html'
                })

                //Brands routes
                .state('dashboard.brands', {
                    url: '/brands',
                    templateUrl: 'app/modules/dashboard/views/brand-edit.html'
                })

                //Category routes
                .state('dashboard.categories', {
                    url: '/categories',
                    templateUrl: 'app/modules/dashboard/views/category-edit.html'
                });
        }
    ]);