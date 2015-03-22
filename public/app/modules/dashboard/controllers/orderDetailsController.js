'use strict';

angular.module('dashboard')
    .controller('OrderDetailsController', ['$state', '$stateParams', 'OrdersResource', 'ProductsResource',
        function OrderDetailsController ($state, $stateParams, OrdersResource, ProductsResource) {
            var self = this;

            OrdersResource.getOrderById($stateParams.orderId)
                .then(function (order) {
                    self.order = order;
                    self.orderItems = [];

                    console.log(self.order);

                    var i = 0,
                        categoriesIds = [];
                    while (i < self.order.items.length) {

                        categoriesIds.push(self.order.items[i]);
                        i++;
                    }
                    ProductsResource.getProductById(categoriesIds)
                        .then(function (product) {
                            self.orderItems.push(product);
                        }, function (error) {
                            console.error('Cannot get product with id: ',self.order.items[i], error);
                        });
                }, function (error) {
                    console.error('Cannot get order by id: ', $stateParams.orderId, error);
                });

        }
    ]);