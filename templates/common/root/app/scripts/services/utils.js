angular.module('<%= _.camelize(appname) %>App').factory( "Utils", ['$translate', function( $translate ){
		
		var _Utils = {};

		//To see more information about GHPD Config go to
		//https://docs.google.com/a/bbva.com/document/d/1S9Ozi8bLoVS5D5x5gkiHsaqyCTGqsAwYqjpiNxyqywo/edit#heading=h.h9mku1yrbwfm

		var _appConfig = {
			liquid:    true,
			toolbar:   true,
			favorite:  true,
			printable: true,
			refresh:   true,
			navigable: false
		};

		_Utils.conf = {
				'inGHPD' : false			
		};

		_Utils.configureApp = function() {
			
			bbva.front.global.Invoke( 'configureApp', _appConfig );
			bbva.front.util.crossframe.SetAutoWindowResize(true);
			
		}
		
		_Utils.lang = {
			availables: "en_GB,en_US,es_ES,pt_PT",
        	defaultLang: "es_ES",
        	set : function( p_lang ){
        		defaultLang: p_lang,
        		$translate.use(p_lang);
        	},
        	get : function(){
        		return this.defaultLang;
        	}
		};

		_Utils.statistics = {

			'CORS' : {
				  'accessApp' : 'registraSeguimientoAccesoApp'
				, 'accessTab' : 'registraSeguimientoAccesoPes'
				, 'action' : 'registraSeguimientoAccionApp'
			},
			
			'appName' : '<%= _.camelize(appname) %>',

			'section' : {
				  'main' : 'main'
			},

			'action' : {
				  'click' : 'click'				
			},

			registerAppAccess : function(){
				bbva.front.global.Invoke( this.CORS.accessApp, [this.appName] );
			},

			registerSectionAccess : function( p_section ){
				bbva.front.global.Invoke( this.CORS.accessTab, [this.appName, p_section] );
			},

			registerAction : function( p_section, p_action){

				var   _notification = p_notification.preview || p_notification.pushBody || ""
					, _notificationOrigin = p_notification.atom || "";

				bbva.front.global.Invoke( this.CORS.action, [this.appName, p_section, p_action] );

			}
				
		};
		
		_Utils.goToURL = function( p_url, p_appName, p_atom, p_type){
			
			if( p_url ){				
				var _type = p_type || 11;
				bbva.front.global.Invoke("pedirUrl", [p_url, _type, p_appName, p_appName, p_atom]);				
			}

		};
		
		_Utils.configureApp();
		
		return _Utils;

}]);