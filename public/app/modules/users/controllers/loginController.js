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
        }
    ]);