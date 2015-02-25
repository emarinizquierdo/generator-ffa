'use strict';

angular.module('<%= _.camelize(appname) %><% if (isApp) { %>App<% } %>')
  .service('<%= _.camelize(name) %>', function <%= _.camelize(name) %>() {
    // AngularJS will instantiate a singleton by calling "new" on this function
});
