'use strict';

angular.module('core')
    .run(['$rootScope', '$state',
        function($rootScope, $state) {
            $rootScope.$on('$stateChangeError', function() {

                // If this event is raised, then some of the resolve functions in the states definitions
                // return false, i.e the user does not have permissions to access this state

                $state.go('login');
            })
        }
    ]);