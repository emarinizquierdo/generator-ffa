'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator() {

  	yeoman.generators.Base.apply(this, arguments);

    this.isApp = (typeof this.options.isApp === 'undefined') ? false : this.options.isApp;
    this.appname = (typeof this.options.appName === 'undefined') ? path.basename(process.cwd()) : this.options.appName;

    if (typeof this.env.options.appPath === 'undefined') {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
      this.env.options.appPath = this.env.options.appPath || 'app';
    }

}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.directory('root/app', this.env.options.appPath, true);
  
  if(this.isApp){
    this.directory('root/base', 'app', true);
  }

  this.directory('root/base', this.env.options.appPath, true);  
  this.directory('root/extra', '.', true);
};
