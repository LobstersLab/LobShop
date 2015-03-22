'use strict';

angular.module('catalog')
    .controller('FilterController', ['CategoriesResource',
        function FilterController (CategoriesResource) {
            var self = this;

            // TODO: For each slider create an object with the options below as a model

            self.predicate = '';
            self.priceSlider = 0;
            self.showPrice = true;
            self.showYear = true;
            self.showAge = true;
            self.showLot = true;

            self.priceRange = {
                min: 0,
                max: 100000,
                ceil: 100000,
                floor: 0,
                step: 50
            };

            self.yearsRange = {
                min: 0,
                max: 10000,
                ceil: 10000,
                floor: 0,
                step: 10
            };

            self.categories = CategoriesResource.getAllCategories();
        }
    ]);