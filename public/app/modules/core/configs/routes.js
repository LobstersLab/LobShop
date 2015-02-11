angular.module('core')
    .config( function ($routeProvider) {
        $routeProvider.when('/',{
            templateUrl: 'app/modules/catalog/views/catalogMain.html',
            controller: 'CatalogController',
            controllerAs: 'catalogCtrl'
        })
        $routeProvider.when('/test',{
            templateUrl: 'app/modules/catalog/views/test.html'
        })
    });