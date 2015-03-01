'use strict';

angular.module('catalog')
    .filter('orderProductsBy', [
        function() {
            return function(products, attribute) {
                if (!attribute) {
                    return products;
                }

                var isDescending = false;

                if (attribute[0] == '-') {
                    isDescending = true;
                    attribute = attribute.substring(1, attribute.length);
                }

                products.sort(function(a, b) {
                    var attrs = attribute.split('.');

                    attrs.forEach(function (attr) {
                        var indexOfBracket = attr.indexOf('[');
                        var attrIndex;

                        if (indexOfBracket > -1) {
                            attrIndex = parseInt(attr.substring(indexOfBracket + 1, attr.indexOf(']')));
                            attr = attr.substring(0, indexOfBracket);
                            a = a[attr][attrIndex];
                            b = b[attr][attrIndex];
                        } else {
                            a = a[attr];
                            b = b[attr];
                        }
                    });

                    a = parseInt(a);
                    b = parseInt(b);

                    if (isDescending) {
                        return b - a;
                    } else {
                        return a - b;
                    }
                });

                return products;
            };
        }
    ]);