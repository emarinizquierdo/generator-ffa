'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(args) {

    ScriptBase.apply(this, arguments);

    var allowedTypes = [
        'constant',
        'factory',
        'provider',
        'service',
        'value'
    ];

    if (allowedTypes.indexOf(this.type) === -1) {
        this.type = 'service';
    }

}

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles() {

    var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    this.appTemplate(path.join('service', this.type), appPath + '/scripts/services/' + this.name);
    this.addScriptToIndex('app', appName + '/scripts/services/' + this.name);

};
