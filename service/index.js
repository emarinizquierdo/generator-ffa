'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(args) {

    ScriptBase.apply(this, arguments);

    this.type = (typeof this.options.type === 'undefined') ? 'service' : this.options.type;

    if (typeof this.env.options.appPath === 'undefined') {
        if (typeof args[1] === 'undefined') {
            try {
                this.env.options.applName = require(path.join(process.cwd(), 'bower.json')).name;
                this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
            } catch (e) {
                console.log("Unable to find bower.json app file.");
            }
        } else {
            try {
                this.env.options.applName = require(path.join(process.cwd(), 'app/' + args[1] + '/config.json')).name;
                this.env.options.appPath = require(path.join(process.cwd(), 'app/' + args[1] + '/config.json')).appPath;
            } catch (e) {
                console.log("Unable to find " + args[1] + " widget config.json file.");
                try {
                    this.env.options.applName = require(path.join(process.cwd(), 'bower.json')).name;
                    this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
                } catch (e) {
                    console.log("Unable to find bower.json app file.");
                }
            }
        }
    } else {
        try {
            this.env.options.applName = require(path.join(process.cwd(), this.env.options.appPath + '/config.json')).name;
        } catch (e) {
            console.log("Unable to find " + args[1] + " widget config.json file.");
        }
    }

    this.env.options.applName = this.env.options.applName || 'app';
    this.env.options.appPath = this.env.options.appPath || 'app';

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
    var appName = this.env.options.applName;

    this.appTemplate(path.join('service', this.type), appPath + '/scripts/services/' + this.name);
    this.testTemplate('unit/service', appPath + '/test/unit/services/' + this.name);
    this.addScriptToIndex('app', appName + '/scripts/services/' + this.name);

};
