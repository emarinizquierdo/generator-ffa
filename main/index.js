'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {

	var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    this.appTemplate('app', appPath + '/scripts/app');
    this.addScriptToIndex('app', appName + '/scripts/app');

};
