var express = require('express')
	http = require('http'),
	app = express(),
	httpProxy = require('http-proxy'),
	proxy = httpProxy.createProxyServer({}),
	configuration = {};


//Configure your server
configuration = {
	  appPath : '/app'
	, server_port : 8081
	, proxy_host : "localhost"
	, proxy_port : 8080
	, rest_services : [
		  "/s/*"
	  ]
};

app.use(express.static(__dirname + configuration.appPath));

app.get("/", _proxy);

for( var _i = 0; _i < configuration.rest_services.length; _i++){
	app.get(configuration.rest_services[_i], _proxy);
}

function _proxy(req,res){
	"use strict";
    console.log('Serving ' + req.url + ' from proxy ' + configuration.proxy_host + ':' + configuration.proxy_port);
    return proxy.web(req, res, {
        target: 'http://' + configuration.proxy_host + ':' + configuration.proxy_port
    });
}

// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  
  console.log('Error in proxy socket. Reconnecting');

  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  
  res.end('Something went wrong. And we are reporting a custom error message.');

});

app.listen(configuration.server_port);

console.log('Server listen in localhost:' + configuration.server_port);