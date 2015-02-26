'use strict';
var util = require('util');
var path = require('path');

var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');

module.exports = Generator;

function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);

    try {
        this.appname = require(path.join(process.cwd(), 'bower.json')).name;
    } catch (e) {
        this.appname = path.basename(process.cwd());
    }

    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname))).replace(/\-/g, "");
    this.env.options.appPath = 'app';
    this.env.options.appName = this.appname;
    this.env.options.appPath += '/' + this.env.options.appName;

    var sourceRoot = '/templates/javascript';
    this.scriptSuffix = '.js';

    this.sourceRoot(path.join(__dirname, sourceRoot));
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function(src, dest) {
    yeoman.generators.Base.prototype.template.apply(this, [
        src + this.scriptSuffix,
        dest + this.scriptSuffix
    ]);
};

Generator.prototype.htmlTemplate = function(src, dest) {
    yeoman.generators.Base.prototype.template.apply(this, [
        src,
        dest
    ]);
};

Generator.prototype.addScriptToIndex = function(src, dest) {
    try {
        var appPath = this.env.options.appPath;
        var fullPath = path.join(src, 'index.jsp');
        angularUtils.rewriteFile({
            file: fullPath,
            needle: '<!-- endbuild -->',
            splicable: [
                '<script src="' + dest + '.js"></script>'
            ]
        });
    } catch (e) {
        console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + dest + '.js ' + 'not added.\n'.yellow);
    }
};
