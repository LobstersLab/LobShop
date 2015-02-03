'use strict';

angular.module('core').controller('CoreController', ['ProductsResource',
    function coreController (ProductsResource) {
        this.message = 'Hello AngularJS, we are Lobsters Lab!';

        //this.products = ProductsResource.getAll();
        this.products = [{
            title: 'Circa #102',
            description: 'Very good coin',
            lot: 210,
            price: 240000,
            year: 1800
        }, {
            title: 'Circa #103',
            description: 'Very good coin',
            lot: 211,
            price: 240000,
            year: 1800
        }, {
            title: 'Circa #104',
            description: 'Very good coin',
            lot: 212,
            price: 240000,
            year: 1800
        }, {
            title: 'Circa #105',
            description: 'Very good coin',
            lot: 213,
            price: 240000,
            year: 1800
        }, {
            title: 'Circa #106',
            description: 'Very good coin',
            lot: 214,
            price: 240000,
            year: 1800
        }];
    }])