'use strict';

angular.module('users')
    .controller('LoginController', ['$scope', '$state', 'auth', 'identity',
        function LoginController ($scope, $state, auth, identity) {
            var self = this;

            self.identity = identity;
            self.user = {};

            self.login = function () {
                auth.login(self.user)
                    .then(function () {
                        console.log('User successfully logged in! ', arguments);
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
                    field = $scope.loginForm[fieldName].$viewValue;
                }

                if (!field || field.length === 0) {
                    return true;
                }

                return false;
            };
        }
    ]);