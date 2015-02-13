'use strict';

angular.module('users')
    .factory('auth', ['$http', '$q', 'identity', function($http, $q, identity) {
        var baseApiUrl = 'http://localhost:3310';

        return {
            signup: function(user) {
                var deferred = $q.defer();

                var req = {
                    method: 'POST',
                    url: baseApiUrl + '/auth/signup',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];

                        for(var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }

                        return str.join("&");
                    },
                    data: user
                };

                $http(req)
                    .success(function (data, status, headers, config) {
                        console.log('Success: ', data);

                        identity.setCurrentUser(data.user);

                        deferred.resolve(true);
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Error: ', data);

                        deferred.reject();
                    });

                return deferred.promise;
            },
            login: function(user){
                var deferred = $q.defer();

                var req = {
                    method: 'POST',
                    url: baseApiUrl + '/auth/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: user
                };

                $http(req)
                    .success(function (data, status, headers, config) {
                        console.log('Success: ', data);

                        identity.setCurrentUser(data.user);

                        deferred.resolve(true);
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Error: ', data);

                        deferred.reject();
                    });

                return deferred.promise;
            },
            logout: function() {
                var deferred = $q.defer();

                $http.get(baseApiUrl + '/auth/logout')
                    .success(function() {
                        identity.setCurrentUser(undefined);
                        deferred.resolve();
                    });

                return deferred.promise;
            },
            isAuthenticated: function() {
                if (identity.isAuthenticated()) {
                    return true;
                }
                else {
                    return $q.reject('not authorized');
                }
            },
            isAdmin: function(role) {
                if (identity.isAdmin()) {
                    return true;
                }
                else {
                    return $q.reject('not authorized');
                }
            }
        };
    }]);