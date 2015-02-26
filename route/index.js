'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(args) {

    ScriptBase.apply(this, arguments);

    this.hookFor('ffa:controller', {
        options: {
            options: {}
        }
    });

    this.hookFor('ffa:view', {
        options: {
            options: {}
        }
    });

}

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function() {

    var appPath = this.env.options.appPath;
    var appName = this.env.options.appName;

    angularUtils.rewriteFile({
        file: appPath + '/scripts/app.js',
        needle: '.otherwise',
        splicable: [
            '.when(\'/' + this.name + '\', {',
            '  templateUrl: \'' + appName + '/views/' + this.name + '.html\',',
            '  controller: \'' + this._.classify(this.name) + 'Ctrl\'',
            '})'
        ]
    });
};
