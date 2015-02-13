angular.module('dashboard')
    .directive('brandEdit', function () {
        return {
            restrict: "E",
            templateUrl: "app/modules/dashboard/views/brand-edit.html",
            controller: "BrandDashboardController",
            controllerAs: "brandEditCtrl"
        };
    });
