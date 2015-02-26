'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(args) {
    ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {

    var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    this.appTemplate('directive', appPath + '/scripts/directives/' + this.name);
    this.addScriptToIndex('app', appName + '/scripts/directives/' + this.name);

};
