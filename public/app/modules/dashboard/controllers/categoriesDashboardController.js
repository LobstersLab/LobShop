'use strict';

angular.module('dashboard')
    .controller('CategoriesDashboardController', ['$scope', 'CategoriesResource',
        function($scope, CategoriesResource){
            var self = this;

            self.selectedCategory = {};

            self.categories = CategoriesResource.getAllCategories();

            self.selectCategory = function (categoryId) {
                if(categoryId){
                    ProductsResource.getProductById(categoryId).then(function (data){
                        self.selectedCategory = data;
                    });
                }else{
                    self.selectedCategory = {};
                }
            };

            self.categoryEditFormSubmit = function (){
                debugger
                CategoriesResource.createCategory(self.selectedCategory);
            }
        }
    ]);