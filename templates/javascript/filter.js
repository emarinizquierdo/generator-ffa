'use strict';

angular.module('<%= _.camelize(appname) %><% if (isApp) { %>App<% } %>')
  .filter('<%= _.camelize(name) %>', function () {
    return function (input) {
      return '<%= _.camelize(name) %> filter: ' + input;
    };
  });
