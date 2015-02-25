'use strict';

angular.module('<%= _.camelize(appname) %>App')
    .directive('<%= _.camelize(name) %>', function() {
        return {
            template: '<div></div>',
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', function controller($scope, $element, $attrs) {
                $attrs;
                $element.text('this is the <%= _.camelize(name) %> directive');
            }]
        };
    });
