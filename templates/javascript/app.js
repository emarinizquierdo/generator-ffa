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

        $routeProvider
            .when('/', {
                templateUrl: '<%= _.camelize(appname) %>/views/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });


        $translateProvider.useLoader('customLoader', {});
        $translateProvider.preferredLanguage("es_ES");
        //set HTML5 mode
        $locationProvider.html5Mode(true);

        //Disable SCE Provider
        //$sceProvider.enabled(false);

    }]);

angular.module('<%= _.camelize(appname) %>App').factory('customLoader', ['$http', '$q', function($http, $q) {

    return function(options) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: '<%= _.camelize(appname) %>/lang/' + options.key + '.json'
            })
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function() {
                deferred.reject(options.key);
            });

        return deferred.promise;
    }
}]);

var <%= _.camelize(appname) %> App = {
    auxLanguage: 'es_ES',
    timer: null,
    isGHPD: false
};

//Application run.
angular.module('<%= _.camelize(appname) %>App').run(['$rootScope', '$translate', '$location', '$timeout', 'Utils', function($rootScope, $translate, $location, $timeout, Utils) {

    $rootScope.loadingApp = true;

    $translate.use( <%= _.camelize(appname) %> App.auxLanguage);
    Utils.conf.inGHPD = _isGHPD;

    /* Statistic Record - App Access */
    /* Record only if app owner wants to record statistics */
    //Utils.statistics.registerAppAccess();

    bbva.front.util.crossframe.Subscribe("bbva.front.changeLanguage", function(data) {

        if (!$rootScope.$$phase) {

            $rootScope.$apply(function() {
                Utils.lang.set(data.language);
            });

            $timeout(function() {
                $location.search('_nc', Date.now());
            }, 2000);

        }

    });

    var _origin = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port;
    bbva.front.global.Invoke('RegisterLogout', [_origin + '/Logout?guest=true&output=jsonP']);

}]);

$(document).ready(function() {

    <%= _.camelize(appname) %> App.timer = setTimeout(function() {
        angular.bootstrap(document.getElementById('ng-app'), ['<%= _.camelize(appname) %>App']);
    }, 5000);


    bbva.front.global.Invoke("getCurrentLanguage", function(data) {

         <%= _.camelize(appname) %>App.auxLanguage = data.lang;
         <%= _.camelize(appname) %>App.isGHPD = true;

        clearTimeout( <%= _.camelize(appname) %> App.timer );
        angular.bootstrap(document.getElementById('ng-app'), ['<%= _.camelize(appname) %>App']);

    });
});
