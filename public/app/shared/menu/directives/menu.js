angular.module('menu')
    .controller('menu', [function () {
        return {
            restrict: 'E',
            template: "<div ng-class='{ left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
            transclude: true,
            scope: {
                //visible: "=",
                alignment: "@"
            }
        };
    }]);