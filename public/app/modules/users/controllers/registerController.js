'use strict';

angular.module('users')
    .controller('RegisterController', ['$scope', '$state', 'identity', 'auth',
        function RegisterController ($scope, $state, identity, auth) {
            var self = this;

            self.identity = identity;
            self.user = {};

            self.register = function () {
                auth.signup(self.user)
                    .then(function () {
                        console.log('User successfully registered!', arguments);

                        $state.go('home');
                    });
            };

            self.isEmpty = function (fieldName) {
                var field;

                if (!fieldName) {
                    return false;
                }
                else if (self.user[fieldName]) {
                    field = self.user[fieldName];
                }
                else {
                    field = $scope.registrationForm[fieldName].$viewValue;
                }

                if (!field || field.length === 0) {
                    return true;
                }

                return false;
            };
        }
    ]);