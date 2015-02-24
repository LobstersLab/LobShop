'use strict';

angular.module('shoppingCart')
    .controller('OrderController', ['$window', '$scope', '$state',
        function OrderController ($window, $scope, $state) {
            var self = this;
            var ORDER_STATE_STORAGE = 'OrderStateStorage'

            self.user = {};
            self.currentState = $state.current;

            self.orderState = getOrderState() || {
                completedForms: {
                    personalInfo: false,
                    deliveryInfo: false,
                    paymentInfo: false,
                    confirm: false
                }
            };

            self.isEmpty = function (formName, fieldName) {
                var field;

                if (!fieldName) {
                    return false;
                }
                else if (self.user[fieldName]) {
                    field = self.user[fieldName];
                }
                else {
                    field = $scope.orderForm[formName][fieldName].$viewValue;
                }

                if (!field || field.length === 0) {
                    return true;
                }

                return false;
            };

            self.isActiveState = function (stateName) {
                var currentState = $state.current.name.split('.')[1];

                return currentState === stateName;
            };

            self.isFormCompleted = function (formName) {
                return self.orderState.completedForms[formName];
            };

            self.completeForm = function (formName) {
                self.orderState.completedForms[formName] = true;
                setOrderState(self.orderState);
            };

            self.isDisabled = function (stateName) {
                return !self.isActiveState(stateName) && !self.isFormCompleted(stateName);
            };

            function getOrderState () {
                return JSON.parse($window.sessionStorage.getItem(ORDER_STATE_STORAGE));
            }

            function setOrderState (state) {
                $window.sessionStorage.setItem(ORDER_STATE_STORAGE, JSON.stringify(state));
            }
        }
    ]);