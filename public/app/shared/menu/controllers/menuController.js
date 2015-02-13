angular.module('menu')
    .controller('MenuController', ['$state', 'identity', 'auth',
        function MenuController ($state, identity, auth) {
            var self = this;

            self.identity = identity;
            self.menuToggle = false;

            self.logout = function () {
                auth.logout()
                    .then(function () {
                        self.menuToggle = false;
                        self.currentUser = undefined;

                        $state.go('home');
                    });
            };
        }
    ]);