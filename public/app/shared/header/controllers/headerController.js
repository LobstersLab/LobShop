'use strict';

angular.module('header')
    .controller('HeaderController', [
        function HeaderController () {
            var self = this;
            self.brand = "Kir's Auction";
        }
    ]);