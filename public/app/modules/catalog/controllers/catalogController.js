'use strict';

angular.module('catalog').controller('CatalogController', ['ProductsResource',
    function catalogController (ProductsResource) {
        //this.message = 'Hello AngularJS, we are Lobsters Lab!';

        //this.products = ProductsResource.getAll();
        var sampleProducts = [{
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 210,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 211,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 212,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 213,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }, {
            title: 'IONIA, Magnesia ad Maeandrum',
            description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
            lot: 214,
            price: 240000,
            year: 1800
        }];

        this.getProducts = function (){
            return sampleProducts;
        };
    }]);