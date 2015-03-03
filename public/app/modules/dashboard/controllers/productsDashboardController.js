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

            self.ages = ['B.C.','A.D.'];

            self.selectProduct = function (productId) {
                if(productId){
                    ProductsResource.getProductById(productId).then(function (data){
                        self.selectedProduct = data;
                        //TODO fix this in a different way as this is petarded
                        self.selectedProduct.description = data.description[0].value;
                        self.selectedProduct.productCategory = data.category;
                        self.selectedProduct.highlight = !!data.highlight;
                    });
                }else{
                    self.selectedProduct = {};
                }
            };

            self.deleteProduct = function (productID) {
                if(confirm('Delete item?')) {
                    ProductsResource.deleteProductById(productID).then(function (data) {
                        self.products = ProductsResource.getAllProducts();
                        console.log('Product Deleted Successfully!');
                    }, function (error) {
                        console.log('Error deleting product!');
                    });
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
                            'name': 'yearsFrom',
                            'value': self.selectedProduct.yearsFrom
                        },
                        {
                            'name': 'yearsTo',
                            'value': self.selectedProduct.yearsTo
                        },
                        {
                            'name': 'age',
                            'value': self.selectedProduct.age
                        },
                        {
                            'name': 'highlight',
                            'value': self.selectedProduct.highlight
                        },
                        {
                            'name': 'preservation',
                            'value': self.selectedProduct.preservation
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
                        function(error){
                            console.error('Cannot update product!', error);
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
                        function(error){
                            console.error('Cannot create product!', error);
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