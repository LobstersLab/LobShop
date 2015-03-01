'use strict';

angular.module('product')
    .factory('ProductsResource', ['$resource', '$q', '$upload',
        function ProductsResource ($resource, $q, $upload) {
            var Product = $resource('/api/products/:productId', { productId: '@productId' });

            return {
                getAllProducts : function () {
                    return Product.query();
                },
                getProductById: function (id){
                    var deferred = $q.defer();

                    Product.get({productId:id}, function (product) {
                        deferred.resolve(product);
                    });

                    return deferred.promise;
                },
                createProduct : function (params){
                    debugger
                    var deferred = $q.defer();

                    params.url = 'api/products';

                    $upload.upload(params).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * (evt.loaded / evt.total));

                        deferred.notify(progressPercentage);
                    }).success(function (data, status, headers, config) {
                        deferred.resolve('Upload Complete!');
                    });

                    return deferred.promise;
                },
                updateProduct : function (params){
                    debugger
                    var deferred = $q.defer();

                    params.url = 'api/products/' + params.productId;

                    $upload.upload(params).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * (evt.loaded / evt.total));
                        deferred.notify(progressPercentage);
                    }).success(function (data, status, headers, config) {
                        deferred.resolve('Update Complete!');
                    });

                    return deferred.promise;
                }
            };
        }
    ]);