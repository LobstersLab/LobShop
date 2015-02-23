'use strict';

angular.module('catalog')
    .controller('FilterController', [
        function () {
            var self = this;

            self.predicate = '';
            self.min = 130;
            self.max = 370;
            self.ceil = 500;
            self.floor = 0;
            self.step = 10;
            self.priceSlider = 0;
        }
    ]);