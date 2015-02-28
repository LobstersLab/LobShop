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

                    var i = 0;
                    while (i < self.order.items.length) {
                        ProductsResource.getProductById(self.order.items[i])
                            .then(function (product) {
                                self.orderItems.push(product);
                            }, function (error) {
                                console.error('Cannot get product with id: ',self.order.items[i], error);
                            });

                        i++;
                    }
                }, function (error) {
                    console.error('Cannot get order by id: ', $stateParams.orderId, error);
                });

        }
    ]);