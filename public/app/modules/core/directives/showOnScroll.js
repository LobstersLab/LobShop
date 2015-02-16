'use strict';

angular.module('core')
    .directive('showOnScroll', ['$window',
        function ($window) {
            return function (scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    if (this.pageYOffset >= scope.catalogCtrl.lastPageYOffset) {
                        element.addClass('ng-hide');
                        element.removeClass('ng-show');

                        scope.catalogCtrl.lastPageYOffset = this.pageYOffset;
                    } else {
                        element.removeClass('ng-hide');
                        element.addClass('ng-show');

                        scope.catalogCtrl.lastPageYOffset = this.pageYOffset;
                    }
                });
            }
        }
    ]);