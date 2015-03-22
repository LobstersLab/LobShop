'use strict';

angular.module('product')
    .controller('ProductController', ['$stateParams', '$window', '$state', '$modal', 'ProductsResource', 'CategoriesResource', 'ShoppingCart',
        function ProductController ($stateParams, $window, $state, $modal, ProductsResource, CategoriesResource, ShoppingCart) {
            var self = this;

            self.cart = ShoppingCart;
            self.productId = $stateParams.productId;
            self.relatedProducts = ProductsResource.getAllProducts();

            ProductsResource.getProductById(self.productId)
                .then(function (product) {
                    self.product = product;
                    CategoriesResource.getCategoryById(product.category)
                        .then(function (category) {
                            self.category = category;
                        }, function (error) {
                            console.error('Cannot get category by id: ', error);
                        });
                }, function (error) {

                });

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

            self.zoomImage = function (src) {
                $window.open(src, '_blank');

                //self.modalInstance = $modal.open({
                //    templateUrl: 'app/shared/product/views/zoomedImage.html',
                //    controller: 'ZoomedImageController',
                //    controllerAs: 'zoomedImageCtrl',
                //    size: 'lg',
                //    resolve: {
                //        product: function () {
                //            return self.product;
                //        }
                //    }
                //});
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