'use strict';

angular.module('catalog')
    .controller('CatalogController', ['$state', '$modal', 'ProductsResource', 'ShoppingCart',
        function CatalogController ($state, $modal, ProductsResource, ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
            self.products = ProductsResource.getAllProducts();

            self.products.$promise.then(function () {
                angular.forEach(self.products, function (product) {
                    if (ShoppingCart.isInShoppingCart(product)) {
                        product.inShoppingCart = true;
                    }
                });
            }, function () {

            });


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

                product.inShoppingCart = true;

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
            };
        }
    ]);