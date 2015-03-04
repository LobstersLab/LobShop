'use strict';

angular.module('catalog')
    .controller('ShoppingCartDialogController', ['$state', '$modalInstance', 'message',
        function BuyedItemDialogController ($state, $modalInstance, message) {
            var self = this;

            self.message = message;

            self.continueToCatalog = function () {
                $modalInstance.close();
                $state.go('home');
            };
        }
    ]);
