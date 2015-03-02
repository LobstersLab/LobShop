'use strict';

angular.module('catalog')
    .controller('CatalogController', ['$state', '$modal', 'ProductsResource', 'ShoppingCart',
        function CatalogController ($state, $modal, ProductsResource, ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
            self.products = ProductsResource.getAllProducts();
            self.lastPageYOffset = 0;

            self.openProductDetails = function (product) {
                $state.go('product', {
                    productId: product._id
                });

                product.hover = false;
            };

            self.hoverProduct = function (product) {
                product.hover = true;
            };

            self.unhoverProduct = function (product) {
                product.hover = false;
            };

            self.buyItem = function (product) {
                ShoppingCart.insertItem(product);

                self.modalInstance = $modal.open({
                    templateUrl: 'app/modules/catalog/views/buyedItemDialog.html',
                    controller: 'BuyedItemDialogController',
                    controllerAs: 'buyedItemDialogCtrl',
                    resolve: {
                        product: function () {
                            return product;
                        }
                    }
                });

                //modalInstance.result.then(function (selectedItem) {
                //    $scope.selected = selectedItem;
                //}, function () {
                //    $log.info('Modal dismissed at: ' + new Date());
                //});
            };
        }
    ]);