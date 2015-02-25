'use strict';
var path = require('path');
var util = require('util');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');
var fs = require('fs');

var FfaGenerator = module.exports = function Generator(args, options) {

  if(fs.existsSync('package.json')){
    fs.unlinkSync('package.json');
  }
  
  if(fs.existsSync('bower.json')){
    fs.unlinkSync('bower.json');
  }

  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  this.hookFor('ffa:widget', {
    args: this.appname,
    options : {
      options : {
        isApp : true
      }
    }
  });

};

util.inherits(FfaGenerator, yeoman.generators.NamedBase, ScriptBase);
