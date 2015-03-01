'use strict';

angular.module('users')
    .controller('RegisterController', ['$scope', '$state', 'Identity', 'Authentication', 'StatelineFactory',
        function RegisterController ($scope, $state, Identity, Authentication, StatelineFactory) {
            var self = this;

            self.identity = Identity;
            self.user = {};

            self.stateline = new StatelineFactory({
                states: ['personal', 'details', 'account'],
                baseState: 'register.',
                scope: $scope,
                callback: function () {
                    console.log('Congratulations! Registration form is complete!');
                }
            });

            self.register = function () {
                Authentication.signup(self.user)
                    .then(function () {
                        $state.go('home');
                    });
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
                    field = $scope.registrationForm[formName][fieldName].$viewValue;
                }

                if (!field || field.length === 0) {
                    return true;
                }

                return false;
            };
        }
    ]);