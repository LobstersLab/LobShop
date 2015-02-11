'use strict';

angular.module('users')
    .controller('RegisterController', [function RegisterController () {
        var self = this;

        self.register = function () {
            console.log('You are registering...', self.user);
        };
    }]);