'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
    ScriptBase.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../templates'));
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {

    var appPath = this.env.options.appPath;

    this.template('common/view.html', path.join(appPath, '/views/' + this.name + '.html'));

};
