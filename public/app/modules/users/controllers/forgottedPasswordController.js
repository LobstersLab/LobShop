'use strict';

angular.module('users')
    .controller('ForgottenPasswordController', ['$scope', '$state',
        function ForgottenPasswordController ($scope, $state) {
            var self = this;

            self.forgottenUser = {};

            self.changePassword = function () {
                // TODO: Send request and actually change the password for the user (need discussion)
                console.log(forgottenUser);
            };

            self.isEmpty = function (fieldName) {
                var field;

                if (!fieldName) {
                    return false;
                }
                else if (self.forgottenUser[fieldName]) {
                    field = self.forgottenUser[fieldName];
                }
                else {
                    field = $scope.forgottenPasswordForm[fieldName].$viewValue;
                }

                if (!field || field.length === 0) {
                    return true;
                }

                return false;
            };
        }
    ]);