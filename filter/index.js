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

Generator.prototype.createFilterFiles = function createFilterFiles() {

    var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    this.appTemplate('filter', appPath + '/scripts/filters/' + this.name);
    this.addScriptToIndex('app', appName + '/scripts/filters/' + this.name);

};
