'use strict';

angular.module('product')
    .factory('ProductsResource', ['$resource','$q', '$upload',
        function ProductsResource ($resource, $q, $upload) {
            var Product = $resource('/api/products/:productId', { productId: '@productId' });

            return {
                getAllProducts : function () {
                    return Product.query();
                },
                getProductById: function (id){
                    var deferred = $q.defer();

                    Product.get({productId:id}, function (data) {
                        //Data assignment
                        var productData = {
                            name: data.product.name,
                            description: data.product.description[0].value,
                            price: (data.price && data.price.price)? data.price.price : 0
                        };
                        //Assign attributes
                        var i=0;
                        while(data.product.attributes.length > i){
                            var attr = data.product.attributes[i];
                            productData[attr.name] = attr.value;
                            i++;
                        }
                        deferred.resolve(productData);
                    });

                    return deferred.promise;
                },
                createProduct : function (params){
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
                    var deferred = $q.defer();
                    params.url = 'api/products:' + params.productId;
                    $upload.upload(params).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * (evt.loaded / evt.total));
                        deferred.notify(progressPercentage);
                    }).success(function (data, status, headers, config) {
                        deferred.resolve('Update Complete!');
                    });

                    return deferred.promise;
                }
            };

            //return Product;

        }
    ]);