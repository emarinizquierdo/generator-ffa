'use strict';

angular.module('<%= _.camelize(appname) %><% if (isApp) { %>App<% } %>')
  .controller('<%= _.classify(name) %>Ctrl<% if (!isApp) { %><%= _.camelize(appname) %><% } %>', ['$scope',<% if (!isApp) { %>'$templateCache',<% } %><% if (!isApp) { %>'$translate',<% } %> function ($scope<% if (!isApp) { %> ,$templateCache <% } %><% if (!isApp) { %> ,$translate <% } %>) {
    <% if (isApp) { %>$scope.controllerView = '<%= _.classify(name) %>Ctrl';<% } else { %>$scope.controllerTemplate = '<%= _.classify(name) %>Ctrl<%= _.camelize(appname) %>';

	    <% if (_.classify(name) == 'Main'){ %>
			//Widget-Embedded-Styles
		    $scope.WidgetEmbeddedStyles = {};

		    $scope.WidgetEmbeddedStyles.main = 'main';

		    //Widget Styles Manager
		    //Default Style Load
		    var _documentHead = document.getElementsByTagName('head')[0];

		    if(typeof $templateCache.get($scope.WidgetEmbeddedStyles.main) != 'undefined'){
			    var _documentHead = document.getElementsByTagName('head')[0];
				var _widgetStyles = document.createElement('style');
				_widgetStyles.setAttribute('type', 'text/css');
				_widgetStyles.setAttribute('id', '<%= _.camelize(appname) %>mainWES');
				_widgetStyles.appendChild(document.createTextNode($templateCache.get('styles/css/' + $scope.WidgetEmbeddedStyles.main + '.css')));
				_documentHead.appendChild(_widgetStyles);
			}

			$scope.$watch('sharedData.data', 
				function(newValue){
					if(newValue && newValue.config && newValue.config.theme && typeof $templateCache.get('styles/css/' + newValue.config.theme  + '.css') != 'undefined'){
						_widgetStyles = document.getElementById('<%= _.camelize(appname) %>mainWES');
						if(_widgetStyles){
							_documentHead.removeChild(_widgetStyles);
						}
						_widgetStyles = document.createElement('style');
						_widgetStyles.setAttribute('type', 'text/css');
						_widgetStyles.setAttribute('id', '<%= _.camelize(appname) %>mainWES');
						_widgetStyles.appendChild(document.createTextNode($templateCache.get('styles/css/' +  newValue.config.theme + '.css')));
						_documentHead.appendChild(_widgetStyles);
					}			
				}
			,true);
			
		<% } %>
    <% } %>
  }]);
