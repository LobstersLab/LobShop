'use strict';

angular.module('core')
    .factory('CategoriesResource', ['$resource', '$q',
        function CategoriesResource ($resource, $q) {
            var Category = $resource('/api/categories/:categoryId', { categoryId: '@categoryId' },{
                update: {method: 'PUT'}
            });

            return {
                getAllCategories : function () {
                    return Category.query();
                },
                getCategoryById: function (id) {
                    var deferred = $q.defer();

                    Category.get({categoryId: id}, function (category) {
                        deferred.resolve(category);
                    });

                    return deferred.promise;
                },
                createCategory: function (categoryData) {
                    var category = new Category(categoryData);

                    category.$save();
                },
                updateCategoryById: function (category) {
                    var deferred = $q.defer();
                    debugger
                    Category.get({categoryId: category._id}, function (data) {
                        debugger
                        data.name = category.name;
                        category.$update({categoryId: category._id});
                        deferred.resolve(true);
                    });

                    return deferred.promise;
                }
            };
        }
]);