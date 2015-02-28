angular.module('core')
    .factory('CategoriesResource', ['$resource', '$q',
        function CategoriesResource ($resource, $q) {
            var Category = $resource('/api/categories/:categoryId', { categoryId: '@categoryId' });

            return {
                getAllCategories : function () {
                    return Category.query();
                },
                createCategory: function (categoryData) {
                    debugger
                    var category = new Category(categoryData);
                    category.$save();
                }
            };
        }
]);