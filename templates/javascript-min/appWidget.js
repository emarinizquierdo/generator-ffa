'use strict';

angular.module('<%= _.camelize(appname) %>', ['ngRoute', 'pascalprecht.translate'])
//As basic configuration, under GHPD, we can use 'pascalprecht.translate' module
.config(['$translateProvider', function($translateProvider){

    //GHPD provides this language values (es_ES, en_US, en_GB, pt_PT)
    $translateProvider.translations('es_ES', {
      'COMMON': {
          'EXAMPLE' : 'Este texto es multi-idioma'
      }
    });
       
    $translateProvider.translations('en_US', {
      'COMMON': {
        'EXAMPLE' : 'This text is multi-language'
      }
    });

    $translateProvider.translations('en_GB', {
      'COMMON': {
        'EXAMPLE' : 'This text is multi-language'
      }
    });

    $translateProvider.translations('pt_PT', {
      'COMMON': {
        'EXAMPLE' : 'Este texto é multi-linguagem'
      }
    });
       
    $translateProvider.preferredLanguage('en_US');

  }])
  .directive('<%= _.camelize(appname) %>', function factory() {
   var directiveDefinitionObject = {
    priority: 0,
    templateUrl: 'templates/main.html',
    replace: true,
    transclude: false,
    restrict: 'A',
    scope: false,
    controller: ['$scope', '$element', '$translate', function($scope, $element, $translate) {
      

      //---- You can move this variables to a service. It's only a example
      // (This remote info will be sended by GHPD)
      $scope.remoteInfo = {
          "config" : {
              "rootService" : ""
              , "lang" : ""
              , "theme" : ""
              , "availableHeight" : 0
          },
            "notifications" : {
          }
      };

      $scope.langsSupported = ['es_ES', 'en_US', 'en_GB', 'pt_PT'];

      $scope.$watch('remoteInfo.config.lang', function(newValue){
          if($scope.langsSupported.indexOf(newValue) != -1){
            $translate.uses(newValue);
          }
        })  
      //----


      /* --------------------------------------- */
      /*  Start: Share Data Logic to parent App  */
      /* --------------------------------------- */

      var _parentScope = $element.parent().scope();

      $scope.sharedData = {
        remote_change : false,
        data : null
      };

      $scope.updateSharedData = function(p_value){
        $scope.sharedData.data = p_value;
        $scope.sharedData.remote_change = true;
        $scope.remoteInfo.config = (p_value.config) ? p_value.config : {};
        $scope.remoteInfo.notifications = (p_value.notifications) ? p_value.notifications : {};
        if(!$scope.$$phase){
          $scope.$digest();
        }
      }

      $scope.$watch('sharedData.data', function(newValue, oldValue){
        if(!$scope.sharedData.remote_change){
          _parentScope.updatePipe(newValue);
        }
        $scope.sharedData.remote_change = false;
      });

      _parentScope.$emit('widgetReady');

      /* -------------------------------------- */
      /*  End : Share Data Logic to parent App  */
      /* -------------------------------------- */

    }]
  };
  return directiveDefinitionObject;
});