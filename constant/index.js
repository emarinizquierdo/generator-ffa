'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator() {

    ScriptBase.apply(this, arguments);

    this.hookFor('ffa:service', {
        options: {
            options: {
                type: 'constant'
            }
        }
    });

}

util.inherits(Generator, ScriptBase);
