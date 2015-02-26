'use strict';

angular.module('<%= _.camelize(appname) %>App')
    .controller('<%= _.classify(name) %>Ctrl', ['$scope', 'Utils', function($scope, Utils) {

    	$scope.changeLang = Utils.lang.set;

        $scope.controllerView = '<%= _.classify(name) %>Ctrl';

    }]);
