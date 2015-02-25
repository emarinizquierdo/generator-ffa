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

}

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {

	var appPath = this.env.options.appPath;
  	var appName = this.env.options.applName;

	this.appTemplate('filter', appPath + '/scripts/filters/' + this.name);
 	this.testTemplate('unit/filter', appPath + '/test/unit/filters/' + this.name);
 	if(this.isApp){
    this.addScriptToIndex('app', appName + '/scripts/filters/' + this.name);
 	}else{
 		this.addScriptToIndex(appPath, 'scripts/filters/' + this.name);
 	}

};
