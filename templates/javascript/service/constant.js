'use strict';

angular.module('<%= _.camelize(appname) %><% if (isApp) { %>App<% } %>')
  .constant('<%= _.camelize(name) %>', 42);
