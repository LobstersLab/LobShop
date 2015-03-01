'use strict';

angular.module('users')
    .factory('Identity', ['$cookieStore',
        function($cookieStore) {
            var cookieStorageUserKey = 'currentApplicationUser';
            var currentUser;

            function getCurrentUser () {
                var savedUser = $cookieStore.get(cookieStorageUserKey);
                if (savedUser) {
                    return savedUser;
                }

                return currentUser;
            }

            function setCurrentUser (user) {
                if (user) {
                    $cookieStore.put(cookieStorageUserKey, user);
                }
                else {
                    $cookieStore.remove(cookieStorageUserKey);
                }

                currentUser = user;
            }

            function isAuthenticated () {
                return !!this.getCurrentUser();
            }

            function isAdmin () {
                return this.isInRole('admin');
            }

            function isInRole (role) {
                var user = this.getCurrentUser();
                var inRole = false;

                if (user) {
                    var i = 0;
                    while (user.roles.length > i) {
                        var userRole = user.roles[i];

                        if (userRole === role) {
                            inRole = true;
                            break;
                        }

                        i++;
                    }
                }

                return inRole;
            }

            return {
                getCurrentUser: getCurrentUser,
                setCurrentUser: setCurrentUser,
                isAuthenticated: isAuthenticated,
                isAdmin: isAdmin,
                isInRole: isInRole
            }
        }
    ]);
