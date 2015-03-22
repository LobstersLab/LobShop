'use strict';

angular.module('shoppingCart')
    .controller('OrderController', ['$scope', '$state','$modal', 'ShoppingCart', 'Identity', 'StatelineFactory',
        function OrderController ($scope, $state, $modal, ShoppingCart, Identity, StatelineFactory) {
            var self = this;
            var currentUser = Identity.getCurrentUser();

            self.order = {
                paymentMethod: 'cash'
            };
            self.expiryMonths = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            self.expiryYears = [];
            var currentYear = new Date().getFullYear(),
                i=0;
            while(i < 11){
                self.expiryYears.push(currentYear + i);
                i++;
            };



            if (currentUser) {
                self.order = {
                    firstname: currentUser.firstName,
                    lastname: currentUser.lastName,
                    email: currentUser.email,
                    phoneNumber: currentUser.phoneNumber,
                    country: currentUser.country,
                    city: currentUser.city,
                    address: currentUser.address,
                    postalCode: currentUser.postalCode,
                    total: ShoppingCart.getTotal(),
                    paymentMethod: 'cash'
                };
            }

            self.cart = ShoppingCart;


            self.showPopup = function(message){
                self.modalInstance = $modal.open({
                    templateUrl: 'app/modules/shoppingCart/views/shoppingCartDialog.html',
                    controller: 'ShoppingCartDialogController',
                    controllerAs: 'shoppingCartDialogCtrl',
                    resolve: {
                        message: function () {
                            return message;
                        }
                    }
                });
            };

            self.stateline = new StatelineFactory({
                states: ['personalInfo', 'deliveryInfo', 'paymentInfo', 'confirm'],
                baseState: 'order.',
                scope: $scope,
                callback: function () {
                    ShoppingCart.checkoutOrder(self.order)
                        .then(function (message) {
                            //self.showPopup(message);
                            $state.go('successful-payment');
                        }, function (error) {
                            self.showPopup(error);
                        }
                    );
                }
            });
        }
    ]);