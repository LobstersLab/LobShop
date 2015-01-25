'use strict';

angular.module('core').controller('CoreController', ['$scope', 'ProductsResource',
    function coreController ($scope, ProductsResource) {
        $scope.message = 'Hello AngularJS, we are Lobsters Lab!';

        $scope.products = ProductsResource.getAll();
    }])