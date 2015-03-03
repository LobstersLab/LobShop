'use strict';

angular.module('core')
    .controller('ContactsController', ['Email',
        function ContactsController (Email) {
            var self = this;

            self.email = {};

            self.sendMail = function () {
                Email.send(self.email);
                self.successMessage = "Your message was send successfully";
                self.email = {};
            };
        }
    ]);