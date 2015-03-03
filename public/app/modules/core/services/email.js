'use strict';

angular.module('core')
    .factory('Email', ['$http',
        function Email ($http) {
            function send (emailData) {
                var req = {
                    method: 'POST',
                    url: '/emails',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: emailData
                };

                $http(req)
                    .success(function (data, status, headers, config) {
                        console.log('Success: ', data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Error: ', data);
                    });
            }

            return {
                send: send
            };
        }
    ]);