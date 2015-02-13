angular.module('menu')
    .controller('MenuController', ['identity',
        function MenuController (identity) {
            var self = this;

            self.currentUser = identity.getCurrentUser();
            self.menuToggle = false;
        }
    ]);