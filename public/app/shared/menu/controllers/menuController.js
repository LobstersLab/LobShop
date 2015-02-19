angular.module('menu')
    .controller('MenuController', ['$state', 'Identity', 'Authentication',
        function MenuController ($state, Identity, Authentication) {
            var self = this;

            self.identity = Identity;
            self.menuToggle = false;

            self.logout = function () {
                Authentication.logout()
                    .then(function () {
                        self.menuToggle = false;

                        $state.go('home');
                    });
            };
        }
    ]);