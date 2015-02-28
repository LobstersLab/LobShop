'use strict';

angular.module('shoppingCart')
    .factory('OrdersResource', ['$resource', '$q',
        function OrdersResource ($resource, $q) {
            var Order = $resource('/api/orders/:orderId', { orderId: '@orderId' });

            return {
                getAllOrders : function () {
                    // TODO: transform the products as in getProductById or change the response from the server
                    return Order.query();
                },
                getOrderById: function (id){
                    var deferred = $q.defer();

                    Order.get({orderId: id}, function (order) {
                        deferred.resolve(order);
                    });

                    return deferred.promise;
                }
            };
        }
    ]);