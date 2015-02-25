'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(args) {
  
  ScriptBase.apply(this, arguments);

  this.isApp = (typeof this.options.isApp === 'undefined') ? false : this.options.isApp;

  if (typeof this.env.options.appPath === 'undefined') {      
    if( typeof args[1] === 'undefined' ){
      try {
        this.env.options.applName = require(path.join(process.cwd(), 'bower.json')).name;
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
        this.isApp = true;
      } catch (e) {
        console.log("Unable to find bower.json app file.");
      }      
    }else{
      try {
        this.env.options.applName = require(path.join(process.cwd(), 'app/' + args[1] + '/config.json')).name;
        this.env.options.appPath = require(path.join(process.cwd(), 'app/' + args[1] + '/config.json')).appPath;
      } catch (e) {
        console.log("Unable to find " + args[1] + " widget config.json file.");
        try {
          this.env.options.applName = require(path.join(process.cwd(), 'bower.json')).name;
          this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
          this.isApp = true;
        } catch (e) {
          console.log("Unable to find bower.json app file.");
        }
      }        
    }
  }else{      
    try {
      this.env.options.applName = require(path.join(process.cwd(), this.env.options.appPath + '/config.json')).name;
    } catch (e) {
      console.log("Unable to find " + args[1] + " widget config.json file.");
    }      
  }

  this.env.options.applName = this.env.options.applName || 'app';
  this.env.options.appPath = this.env.options.appPath || 'app';

console.log
  this.hookFor('ffa:controller', {
    options : {
      options : {
        isApp : this.isApp
      }
    }
  });
  
  this.hookFor('ffa:view', {
    options : {
      options : {
        isApp : this.isApp
      }
    }
  });

}

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {

  var appPath = this.env.options.appPath;
  var appName = this.env.options.applName;

  angularUtils.rewriteFile({
    file: appPath + '/scripts/app.js',
    needle: '.otherwise',
    splicable: [
      '.when(\'/' + this.name + '\', {',
      '  templateUrl: \'' + appName + '/views/' + this.name + '.html\',',
      '  controller: \'' + this._.classify(this.name) + 'Ctrl\'',
      '})'
    ]
  });
};
