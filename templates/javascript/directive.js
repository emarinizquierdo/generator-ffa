'use strict';

angular.module('<%= _.camelize(appname) %>App')
    .directive('<%= _.camelize(name) %>', function() {
        return {
            templateUrl: '<%= _.camelize(appname) %>/partials/<%= name %>.html',
            restrict: 'A',
            replace: true,
            controller: ['$scope', '$element', '$attrs', function controller($scope, $element, $attrs) {
                
            }]
        };
    });
