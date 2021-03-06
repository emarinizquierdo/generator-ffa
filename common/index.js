'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator() {
    yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {

	var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    // Copies the contents of the generator `templates`
    // directory into your users new application path
    this.sourceRoot(path.join(__dirname, '../templates/common'));
    this.directory('root/app', this.env.options.appPath, true);
    this.directory('root/base', 'app', true);
    this.directory('root/extra', '.', true);

};
