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
                    controller: 'ProductsDashboardController',
                    controllerAs: 'productsDashboardCtrl'
                })
                .state('dashboard.products.productEdit', {
                    url: '/productEdit',
                    templateUrl: 'app/modules/dashboard/views/product-edit.html'
                })

                //Orders routes
                .state('dashboard.orders', {
                    url: '/orders',
                    templateUrl: 'app/modules/dashboard/views/orders.html',
                    controller: 'OrdersDashboardController',
                    controllerAs: 'ordersDashboardCtrl'
                })
                .state('dashboard.orders.details', {
                    url: '/details/:orderId',
                    templateUrl: 'app/modules/dashboard/views/order-details.html',
                    controller: 'OrderDetailsController',
                    controllerAs: 'orderDetailsCtrl'
                })

                //Category routes
                .state('dashboard.categories', {
                    url: '/categories',
                    templateUrl: 'app/modules/dashboard/views/category-edit.html'
                });
        }
    ]);