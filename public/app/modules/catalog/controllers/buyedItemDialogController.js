'use strict';

angular.module('catalog')
    .controller('BuyedItemDialogController', ['$state', '$modalInstance', 'product',
        function BuyedItemDialogController ($state, $modalInstance, product) {
            var self = this;

            self.buyedProduct = product;

            self.cancelBuyedItemDialog = function () {
                $modalInstance.close();
            };

            self.continueToShoppingCart = function () {
                $modalInstance.close();
                $state.go('shoppingCart');
            };
        }
    ]);
