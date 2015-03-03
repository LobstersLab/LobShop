'use strict';

angular.module('shoppingCart')
    .controller('OrderController', ['$scope', '$state', 'ShoppingCart', 'Identity', 'StatelineFactory',
        function OrderController ($scope, $state, ShoppingCart, Identity, StatelineFactory) {
            var self = this;
            var currentUser = Identity.getCurrentUser();

            self.order = {};
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
                    total: ShoppingCart.getTotal()
                };
            }

            self.cart = ShoppingCart;

            self.stateline = new StatelineFactory({
                states: ['personalInfo', 'deliveryInfo', 'paymentInfo', 'confirm'],
                baseState: 'order.',
                scope: $scope,
                callback: function () {
                    console.log('Congratulations! Order form is complete!');
                }
            });
        }
    ]);