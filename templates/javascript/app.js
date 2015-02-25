'use strict';
/**
 * @ngdoc overview
 * @name <%= _.camelize(appname) %>
 * @description
 * # <%= _.camelize(appname) %>
 *
 * Main module of the application.
 */
angular.module('<%= _.camelize(appname) %>App', ['ngRoute', 'ngRoute', 'ngSanitize', 'pascalprecht.translate'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

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
