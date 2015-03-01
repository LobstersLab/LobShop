'use strict';

angular.module('core')
    .provider('RoutePermissions', [function () {

        // All the resolve authenticated check required to return promises

        this.isAdmin = {
            authenticated: ['$q', 'Identity', function($q, Identity) {
                var deferred = $q.defer();

                if (Identity.isAdmin()) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }

                return deferred.promise;
            }]
        };

        this.isAuthenticated = {
            authenticated: ['$q', 'Identity', function($q, Identity) {
                var deferred = $q.defer();

                if (Identity.isAuthenticated()) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }

                return deferred.promise;
            }]
        };

        this.$get = [function () { }];
    }]);