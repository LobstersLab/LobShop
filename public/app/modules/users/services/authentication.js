'use strict';

angular.module('users')
    .factory('Authentication', ['$rootScope', '$http', '$q', 'Identity',
        function($rootScope, $http, $q, Identity) {
            var baseApiUrl = 'http://localhost:3310';

            function signup (user) {
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

                        Identity.setCurrentUser(data.user);
                        $rootScope.$broadcast('login');

                        deferred.resolve(true);
                    })
                    .error(function (data, status, headers, config) {
                        // Handle error correctly
                        console.error('Error: ', data.message);

                        deferred.reject();
                    });

                return deferred.promise;
            }

            function login (user){
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
                        Identity.setCurrentUser(data.user);
                        $rootScope.$broadcast('login');

                        deferred.resolve(true);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(data.message);
                    });

                return deferred.promise;
            }

            function logout () {
                var deferred = $q.defer();

                $http.get(baseApiUrl + '/auth/logout')
                    .success(function() {
                        Identity.setCurrentUser(undefined);
                        $rootScope.$broadcast('logout');

                        deferred.resolve();
                    });

                return deferred.promise;
            }

            return {
                signup: signup,
                login: login,
                logout: logout
            };
        }
    ]);