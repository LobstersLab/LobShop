'use strict';

angular.module('core')
    .factory('CategoriesResource', ['$resource', '$q',
        function CategoriesResource ($resource, $q) {
            var Category = $resource('/api/categories/:categoryId', { categoryId: '@categoryId' });

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
                updateCategoryById: function (id, updates) {
                    var deferred = $q.defer();

                    Category.get({categoryId: id}, function (category) {
                        category.name = updates.name;
                        // TODO: Update category parents

                        category.$save();

                        deferred.resolve(true);
                    });

                    return deferred.promise;
                }
            };
        }
]);