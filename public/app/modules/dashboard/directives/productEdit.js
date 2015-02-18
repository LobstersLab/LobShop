angular.module('dashboard')
    .directive('productEdit', function () {
        return {
            restrict: "E",
            templateUrl: "app/modules/dashboard/views/product-list.html",
            controller: "ProductDashboardController",
            controllerAs: "productCtrl"
        };
    });