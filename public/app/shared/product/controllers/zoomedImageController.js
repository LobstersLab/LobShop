'';

angular.module('product')
    .controller('ZoomedImageController', ['$modalInstance', 'product',
        function ZoomedImageController ($modalInstance, product) {
            var self = this;

            self.product = product;

            self.cancelDialog = function () {
                $modalInstance.close();
            };
        }
    ]);