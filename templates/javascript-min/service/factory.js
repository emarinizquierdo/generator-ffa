'use strict';

angular.module('<%= _.camelize(appname) %>App')
    .factory('<%= _.camelize(name) %>', function() {

        var meaningOfLife = 42;

        // Public API here
        return {
            someMethod: function() {
                return meaningOfLife;
            }
        };
        
    });
