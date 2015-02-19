'use strict';

angular.module('dashboard')
    .controller('ProductDashboardController', ['$scope', '$upload', 'ProductsResource',
        function($scope, $upload, ProductsResource){
            var self = this;

            self.uploadPercent = 0;

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
            };

            self.productEditFormSubmit = function (){
                var files = [],
                    params = {};
                //Check if images are available
                if (self.selectedProduct.frontImage){
                    files.push(self.selectedProduct.frontImage[0]);
                }
                if (self.selectedProduct.backImage) {
                    files.push(self.selectedProduct.backImage[0]);
                }
                //Build params for upload
                if (files.length > 0){
                  params.file = files;
                }
                //Build fields
                params.fields = {
                    'name': self.selectedProduct.name,
                    'description': [{
                        'language': "en",
                        'value': self.selectedProduct.description[0].value
                    }] ,
                    'price': self.selectedProduct.price,
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
                };

                //Check if new product or update
                if (self.selectedProduct.id){
                    params.url = 'api/products/:' + self.selectedProduct.id;
                }else{
                    params.url = 'api/products';

                }

                //Upload
                $upload.upload(params).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * (evt.loaded / evt.total));
                    //debugger
                    self.uploadPercent = progressPercentage;
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    self.uploadPercent = 0;
                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    ]);