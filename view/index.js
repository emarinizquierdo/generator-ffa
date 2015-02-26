'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


module.exports = Generator;

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

  try {
    this.appname = require(path.join(process.cwd(), this.name + '/config.json')).appPath;
  }catch (e) {
    this.appname = path.basename(process.cwd());
  }

}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  
  var appPath = this.env.options.appPath;

  this.template('common/view.html', path.join(appPath, '/views/' + this.name + '.html'));
  
};
