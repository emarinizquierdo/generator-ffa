'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');


module.exports = Generator;

function Generator(args) {

    ScriptBase.apply(this, arguments);

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

    // if the controller name is suffixed with ctrl, remove the suffix
    // if the controller name is just "ctrl," don't append/remove "ctrl"
    if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
        this.name = this.name.slice(0, -4);
    }
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {

    var appPath = this.env.options.appPath;
    var appName = this.env.options.applName;

    this.appTemplate('controller', appPath + '/scripts/controllers/' + this.name);
    this.testTemplate('unit/controller', appPath + '/test/unit/controllers/' + this.name);
    this.addScriptToIndex('app', appName + '/scripts/controllers/' + this.name);

};
