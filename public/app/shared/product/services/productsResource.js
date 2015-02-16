'use strict';

angular.module('product')
    .factory('ProductsResource', ['$resource',
        function ProductsResource ($resource) {
            //var Product = $resource('/api/products/:productId',
            //    { productId: '@id' },
            //    {
            //        getAll: {
            //            method: 'GET',
            //            isArray: true,
            //            cache: true
            //        },
            //        getById: {
            //            method: 'GET'
            //        },
            //        create: {
            //            method: 'POST'
            //        },
            //        update: {
            //            method: 'PUT'
            //        },
            //        remove: {
            //            method: 'DELETE'
            //        }
            //    });
            //

            var products = [{
                id: 1,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 210,
                price: 240000,
                year: 1800
            }, {
                id: 2,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 211,
                price: 240000,
                year: 1800
            }, {
                id: 3,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 212,
                price: 240000,
                year: 1800
            }, {
                id: 4,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 213,
                price: 240000,
                year: 1800
            }, {
                id: 5,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 6,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 7,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 8,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 9,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 10,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 11,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 12,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 13,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 14,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 15,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }, {
                id: 16,
                title: 'IONIA, Magnesia ad Maeandrum',
                description: 'Archepolis.  IONIA, Erythrai. Hekte (Electrum, 2.15 g). Head of Herakles to left, wearing lionskin',
                lot: 214,
                price: 240000,
                year: 1800
            }];

            return {
                getAllProducts : function () {
                    //return Product.getAll();

                    return products;
                },
                getProductById: function (id){
                    //return Product.getById({id: id});

                    return products[id - 1];
                }
            };
        }
    ]);