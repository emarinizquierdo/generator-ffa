'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(args) {
    ScriptBase.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../templates'));
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {

    var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    this.appTemplate('javascript/directive', appPath + '/scripts/directives/' + this.name);
    this.template('common/directive.html', path.join(appPath, '/partials/' + this.name + '.html'));
    this.addScriptToIndex('app', appName + '/scripts/directives/' + this.name);

};
