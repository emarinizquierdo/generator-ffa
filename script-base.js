'use strict';
var util = require('util');
var path = require('path');
//var http = require('http-get');
var fs = require('fs');

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

  if (typeof this.env.options.testPath === 'undefined') {
    try {
      this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
    } catch (e) {}
    this.env.options.testPath = this.env.options.testPath ||  this.env.options.name + "/" + this.appname + "/test";
  }

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee');

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    //if (!this.options.coffee &&
    //  this.expandFiles(path.join(this.env.options.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
    //  this.options.coffee = true;
   // }

    this.env.options.coffee = this.options.coffee;
  }

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe');
    this.env.options.minsafe = this.options.minsafe;
  }

  var sourceRoot = '/templates/javascript';
  this.scriptSuffix = '.js';

  if (this.env.options.coffee) {
    sourceRoot = '/templates/coffeescript';
    this.scriptSuffix = '.coffee';
  }

  if (this.env.options.minsafe) {
    sourceRoot += '-min';
  }

  this.sourceRoot(path.join(__dirname, sourceRoot));
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    dest + this.scriptSuffix
  ]);
};

Generator.prototype.testTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    dest + this.scriptSuffix
  ]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    dest
  ]);
};

Generator.prototype.addScriptToIndex = function (src, dest) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(src, 'index.html');
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
/*
Generator.prototype.copyFromRemote = function( url, relativeFilePath, fileCopyDone ){

  var DirPath = path.join( process.cwd(), path.dirname(relativeFilePath) );

  try{
    var directoryContent = fs.readdirSync(DirPath);
  }catch(e){
    if( !directoryContent ){
      fs.mkdirSync(DirPath);
    } 
  }

  http.get({url: url}, relativeFilePath, function(error,result) {

    if (error) {
        console.error(error);
    } else {
        console.log('File downloaded at: ' + result.file);
    }

  });

}*/