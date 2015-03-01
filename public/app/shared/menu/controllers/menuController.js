angular.module('menu')
    .controller('MenuController', ['$state', 'Identity', 'Authentication', 'ShoppingCart',
        function MenuController ($state, Identity, Authentication, ShoppingCart) {
            var self = this;

            self.identity = Identity;
            self.cart = ShoppingCart;
            self.menuToggle = false;
            self.filterToggle = false;

            self.logout = function () {
                Authentication.logout()
                    .then(function () {
                        self.menuToggle = false;

                        $state.go('home');
                    });
            };
        }
    ]);