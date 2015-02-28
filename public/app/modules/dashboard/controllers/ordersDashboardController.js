'use strict';

angular.module('dashboard')
    .controller('OrdersDashboardController', ['$state', 'OrdersResource',
        function OrdersDashboardController ($state, OrdersResource) {
            var self = this;

            self.orders = OrdersResource.getAllOrders();

            self.openOrderDetails = function (order) {
                $state.go('dashboard.orders.details', { orderId: order._id });
            };
        }
    ]);