'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator() {

  ScriptBase.apply(this, arguments);
  
  this.isApp = (typeof this.options.isApp === 'undefined') ? false : this.options.isApp;

  this.hookFor('ffa:service', {
    options : {
      options : {
        isApp : this.isApp,
        type : 'constant'
      }
    }
  });

}

util.inherits(Generator, ScriptBase);

