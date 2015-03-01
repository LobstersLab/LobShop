'use strict';

angular.module('dashboard')
    .controller('ProductsDashboardController', ['$scope', '$upload', 'ProductsResource', 'CategoriesResource',
        function($scope, $upload, ProductsResource, CategoriesResource){
            var self = this;

            self.uploadPercent = 0;
            self.showUploadBar = false;
            self.uploadPercentText = '';

            self.products = ProductsResource.getAllProducts();

            self.selectedProduct = {};

            self.categories = CategoriesResource.getAllCategories();

            self.selectProduct = function (productId) {
                if(productId){
                    ProductsResource.getProductById(productId).then(function (data){
                        self.selectedProduct = data;

                        //TODO fix this in a different way as this is petarded
                        self.selectedProduct.description = data.description[0].value;
                        self.selectedProduct.productCategory = data.category;

                    });
                }else{
                    self.selectedProduct = {};
                }
            };

            self.productEditFormSubmit = function (){
                var files = [],
                    params = {};
                //Check if images are available
                if (self.selectedProduct.frontImageNew){
                    files.push(self.selectedProduct.frontImageNew[0]);
                }
                if (self.selectedProduct.backImageNew) {
                    files.push(self.selectedProduct.backImageNew[0]);
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
                        'value': self.selectedProduct.description
                    }],
                    'price': self.selectedProduct.price.value,
                    'attributes':[
                        {
                            'name': 'lot',
                            'value': self.selectedProduct.lot
                        },
                        {
                            'name': 'years',
                            'value': self.selectedProduct.years
                        }
                    ],
                    'category' : self.selectedProduct.productCategory
                };

                //Check if new product or update
                if (self.selectedProduct._id){
                    params.productId = self.selectedProduct._id;

                    ProductsResource.updateProduct(params).then(
                        //Success
                        function(message){
                            self.uploadPercent = message;
                            self.selectedProduct = {};
                        },
                        //Error
                        function(){

                        },
                        //Update
                        function(uploadProgress){
                            self.uploadPercent = uploadProgress;
                        }
                    );
                }else{
                    ProductsResource.createProduct(params).then(
                        //Success
                        function(message){
                            setTimeout(function(){
                                self.uploadPercent = 0;
                            },1000);
                            self.uploadPercentText = message;
                            self.selectedProduct = {};
                        },
                        //Error
                        function(){

                        },
                        //Update
                        function(uploadProgress){
                            self.showUploadBar = true;
                            self.uploadPercentText = uploadProgress + '%';
                            self.uploadPercent = uploadProgress;
                        }
                    );
                }


            }
        }
    ]);