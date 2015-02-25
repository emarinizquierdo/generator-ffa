'use strict';

angular.module('<%= _.camelize(appname) %><% if (isApp) { %>App<% } %>')
  .value('<%= _.camelize(name) %>', 42);
