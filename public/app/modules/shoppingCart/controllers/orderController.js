'use strict';

angular.module('shoppingCart')
    .controller('OrderController', ['$scope', '$state',
        function OrderController ($scope, $state) {
            var self = this;

            self.user = {};
            self.states = ['personalInfo', 'deliveryInfo', 'paymentInfo', 'confirm'];
            self.completedStates = getStatesCompletion();
            self.activeState = getActiveState();

            //$scope.$on('$stateChangeSuccess', function () {
            //    if (self.isDisabled(getCurrentStateName())) {
            //        $state.go('order.' + self.activeState);
            //    }
            //});

            self.isStateCompleted = function (state) {
                var indexOfState = self.states.indexOf(state);
                if (indexOfState > -1) {
                    return self.completedStates[indexOfState];
                } else {
                    console.error('State is not defined: ', state);
                }
            };

            self.completeState = function () {
                var activeState = getActiveState();
                if (activeState === getCurrentStateName()) {
                    var indexOfActiveState = self.states.indexOf(activeState);

                    if (indexOfActiveState > -1) {
                        self.completedStates[indexOfActiveState] = true;

                        if (self.states[indexOfActiveState + 1]) {
                            self.activeState = self.states[indexOfActiveState + 1];
                        } else {
                            // Do something when the form is completed
                            console.log('Form is completed');
                        }
                    }
                    else {
                        console.error('Cannot complete state: ', activeState);
                    }
                }
            };

            self.isDisabled = function (stateName) {
                return !self.isStateCompleted(stateName) && stateName !== self.activeState;
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

            self.validateCreditCardNumber = function () {
                console.log('card type clicked: ', $scope);
            };

            self.isValidCreditCardNumber = (function () {
                return {
                    test: function (value) {
                        var regexp;

                        if (self.user.cardType === 'visa') {
                            regexp = /4[0-9]{12}(?:[0-9]{3})?/;
                        } else if (self.user.cardType === 'master-card') {
                            regexp = /5[1-5][0-9]{14}/;
                        } else if (self.user.cardType === 'american-express') {
                            regexp = /3[47][0-9]{13}/;
                        } else if (self.user.cardType === 'diners-club') {
                            regexp = /3(?:0[0-5]|[68][0-9])[0-9]{11}/;
                        } else if (self.user.cardType === 'discover') {
                            regexp = /6(?:011|5[0-9]{2})[0-9]{12}/;
                        } else if (self.user.cardType === 'jcb') {
                            regexp = /(?:2131|1800|35\d{3})\d{11}/;
                        }

                        return regexp.test(value);
                    }
                }
            })();

            self.isValidFullName = function (fullname) {
                if (!fullname) {
                    return;
                }

                var splittedFullName = fullname.split(' ');
                return splittedFullName.length > 1;
            };

            function getActiveState () {
                if (Array.isArray(self.states) && self.states.length > 0) {
                    return self.activeState || self.states[0];
                } else {
                    console.error('States are not defined!');
                }
            }

            function getCurrentStateName () {
                var currentState = $state.current;
                var currentStateName = currentState.name.split('.')[1];

                return currentStateName;
            }

            function getStatesCompletion () {
                var statesCompletion = [];

                var i = 0;
                while (i < self.states.length) {
                    statesCompletion.push(false);

                    i++;
                }

                return statesCompletion;
            }
        }
    ]);