'use strict';

angular.module('dashboard')
    .controller('OrdersDashboardController', ['OrdersResource',
        function OrdersDashboardController (OrdersResource) {
            var self = this;

            self.orders = OrdersResource.getAllOrders();
        }
    ]);