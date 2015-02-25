'use strict';

angular.module('<%= _.camelize(appname) %>App', ['ngRoute'])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

  //set HTML5 mode
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: '<%= _.camelize(appname) %>/views/home.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
}]);
