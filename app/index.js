'use strict';
var path = require('path');
var util = require('util');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var fs = require('fs');

// welcome message
var welcome =
    '\n _______   _______   __     __   ______' +
    '\n|       \\ |       \\ |  \\   |  \\ /      \\' +
    '\n| $$$$$$$\\| $$$$$$$\\| $$   | $$|  $$$$$$\\' +
    '\n| $$__/ $$| $$__/ $$| $$   | $$| $$__| $$' +
    '\n| $$    $$| $$    $$ \\$$\\ /  $$| $$    $$' +
    '\n| $$$$$$$\\| $$$$$$$\\  \\$$\\  $$ | $$$$$$$$' +
    '\n| $$__/ $$| $$__/ $$   \\$$ $$  | $$  | $$' +
    '\n| $$    $$| $$    $$    \\$$$   | $$  | $$' +
    '\n \\$$$$$$$  \\$$$$$$$      \\$     \\$$   \\$$' +
    '\n\n\n         Welcome to FFA Generator \n\n\n';

var Generator = module.exports = function Generator(args, options) {

    console.log(welcome.cyan);

    if (fs.existsSync('package.json')) {
        fs.unlinkSync('package.json');
    }

    if (fs.existsSync('bower.json')) {
        fs.unlinkSync('bower.json');
    }

    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', {
        type: String,
        required: false
    });
    this.argument('apppath', {
        type: String,
        required: false
    });

    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    this.apppath = this.apppath || path.basename(process.cwd());

    var args = ['main'];

    this.appname = this.appname.replace(/\-/g, "");
    this.env.options.appPath = 'app';
    this.env.options.appName = this.appname;
    this.env.options.appPath += '/' +  this.env.options.appName;
    this.apppath = this.env.options.appPath;

    this.hookFor('ffa:common', {
        args: args
    });

    this.hookFor('ffa:main', {
        args: args
    });

    this.hookFor('ffa:controller', {
        args: args
    });

    this.hookFor('ffa:controller', {
        args: ['home']
    });

    this.on('end', function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    });

}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.createIndexHtml = function createIndexHtml() {

    var appPath = this.env.options.appPath;

    this.template('../../templates/common/index.html', path.join("app", 'index.jsp'));

};

Generator.prototype.packageFiles = function() {

    var appPath = '.';

    this.template('../../templates/common/_config.json', path.join(appPath, '/config.json'));
    this.template('../../templates/common/_Gruntfile.js', path.join(appPath, 'Gruntfile.js'));
    this.template('../../templates/common/_package.json', path.join(appPath, 'package.json'));
    this.template('../../templates/common/_bower.json', path.join(appPath, 'bower.json'));
    this.template('../../templates/common/root/extra/.bowerrc', path.join(appPath, '.bowerrc'));
    this.template('../../templates/common/proxy.js', path.join(appPath, 'proxy.js'));

};
