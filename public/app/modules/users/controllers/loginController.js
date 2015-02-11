'use strict';

angular.module('users')
    .controller('LoginController', [function LoginController () {
        var self = this;

        self.login = function () {
            console.log('Logging into account: ', self.user);
        };
    }]);