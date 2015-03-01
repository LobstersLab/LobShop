'use strict';

angular.module('core')
    .directive('showOnTop', ['$window',
        function ($window) {
            return function (scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    if (this.pageYOffset >= 70) {
                        element.addClass('header-fixed');
                    } else {
                        element.removeClass('header-fixed');
                    }
                });
            }
        }
    ]);