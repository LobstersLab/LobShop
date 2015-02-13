'use strict';

angular.module('product')
    .factory('ProductsResource', ['$resource',
        function ProductsResource ($resource) {
            var Product = $resource('/api/products/:productId',
                { productId: '@id' },
                {
                    getAll: {
                        method: 'GET',
                        isArray: true,
                        cache: true
                    },
                    getById: {
                        method: 'GET'
                    },
                    create: {
                        method: 'POST'
                    },
                    update: {
                        method: 'PUT'
                    },
                    remove: {
                        method: 'DELETE'
                    }
                });

            return {
                getAllProducts : function () {
                   return Product.getAll();
                },
                getProductById: function (id){
                    return Product.getById({id: id});
                }
            };
        }
    ]);