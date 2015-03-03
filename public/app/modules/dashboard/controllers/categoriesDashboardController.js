'use strict';

angular.module('dashboard')
    .controller('CategoriesDashboardController', ['$scope', 'CategoriesResource',
        function($scope, CategoriesResource){
            var self = this;

            self.selectedCategory = {};

            self.categories = CategoriesResource.getAllCategories();

            self.selectCategory = function (categoryId) {
                if(categoryId){
                    CategoriesResource.getCategoryById(categoryId).then(function (data){
                        self.selectedCategory = data;
                    });
                }else{
                    self.selectedCategory = {};
                }
            };

            self.categoryFormSubmit = function (){
                //If selected category has id it means it came from server so update rather than create a new one
                if(self.selectedCategory._id){
                    CategoriesResource.updateCategoryById(self.selectedCategory);
                }else{
                    CategoriesResource.createCategory(self.selectedCategory);
                }

            }
        }
    ]);