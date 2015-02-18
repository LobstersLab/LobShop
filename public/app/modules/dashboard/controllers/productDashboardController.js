'use strict';

angular.module('dashboard')
    .controller('ProductDashboardController', ['$scope', '$upload', 'ProductsResource',
        function($scope, $upload, ProductsResource){
            var self = this;

            self.products = ProductsResource.query();

            self.selectedProduct = {};

            self.selectProduct = function (productId) {
                if(productId){
                    ProductsResource.get({productId:productId}, function (data) {
                        self.selectedProduct = data;
                    });
                }else{
                    self.selectedProduct = {};
                }
            }

            self.productEditFormSubmit = function (){
                var files = [];
                files.push(self.selectedProduct.frontImage[0]);
                files.push(self.selectedProduct.backImage[0]);

                $upload.upload({
                    url: 'api/products',
                    fields: {
                        'name': self.selectedProduct.name,
                        'description': [{
                            'language': "en",
                            'value': self.selectedProduct.description[0].value
                        }] ,
                        'attributes':[
                            {
                                'name': 'lot',
                                'value': self.selectedProduct.lot
                            },
                            {
                                'name': 'years',
                                'value': self.selectedProduct.years
                            }
                        ]
                    },
                    file:files
                }).progress(function (evt) {
                    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    ]);