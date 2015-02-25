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
'\n\n\n         Welcome to FFA Generator \n\n' +
'\n We are working to provide that feature. Thanks  \n';


module.exports = Generator;

function Generator(args, options) {

  if(fs.existsSync('package.json')){
    fs.unlinkSync('package.json');
  }
  
  if(fs.existsSync('bower.json')){
    fs.unlinkSync('bower.json');
  }

  yeoman.generators.Base.apply(this, arguments);
  
  this.argument('appname', { type: String, required: false });
  this.argument('apppath', { type: String, required: false });

  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  this.apppath = this.apppath || path.basename(process.cwd());

  this.isApp = (typeof this.options.isApp === 'undefined') ? false : this.options.isApp;

  var args = ['main'];

  if(this.appname != path.basename(process.cwd())){
    this.appname= this.appname.replace(/\-/g,"");
    
    if(!this.isApp){
      this.appname += 'widget';
    }

    this.env.options.appPath = 'app';
    this.env.options.appPath += '/' + this.appname;
    this.apppath = this.env.options.appPath;
    this.jquery = true;
    this.bootstrap = true;
    this.compasssass = false;
    this.bbvafront = true;
    this.resourceModule = true;
    this.cookiesModule = true;
    this.sanitizeModule = true;
  
  }else{

    this.env.options.appPath = 'app';
    this.appPath = this.env.options.appPath;

  }  

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe');
    this.env.options.minsafe = this.options.minsafe;
    args.push('--minsafe');
  }

  this.hookFor('ffa:common', {
    args: args,
    options : {
      options : {
        isApp : this.isApp,
        appName : this.appname
      }
    }
  });

  this.hookFor('ffa:main', {
    args: args,
    options : {
      options : {
        isApp : this.isApp
      }
    }
  });

  this.hookFor('ffa:controller', {
    args: args,
    options : {
      options : {
        isApp : this.isApp
      }
    }
  });

  if(this.isApp){

    this.hookFor('ffa:controller', {
      args: ['home', '--minsafe'],
      options: {
        options: {
            'skip-install': true,
            isApp : this.isApp
        }
      }
    });

  }  

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });

}

util.inherits(Generator, yeoman.generators.Base);

if(this.appname == path.basename(process.cwd())){
  Generator.prototype.askForAppName = function askForAppName() {
    var cb = this.async();

    console.log(welcome);

    this.prompt({
      name: 'appname',
      message: 'How do you want to name your app/widget?',
      default: this.appname.replace(/\-/g,"")
    }, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.appname= props.appname.replace(/\-/g,"");
      if(!this.isApp){
        this.appname += 'widget';
      }
      this.env.options.appPath += '/' + this.appname;
      this.apppath = this.env.options.appPath;

      cb();
    }.bind(this));
  };

  Generator.prototype.askForJQuery = function askForJQuery() {
    var cb = this.async();

    this.prompt({
      name: 'jquery',
      message: 'Would you like to include jQuery?',
      default: true,
      warning: 'Yes: All jQuery files will be placed into the scripts app/vendor directory.'
    }, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.jquery = props.jquery;

      cb();
    }.bind(this));
  };

  Generator.prototype.askForBootstrap = function askForBootstrap() {
    var cb = this.async();

    this.prompt({
      name: 'bootstrap',
      message: 'Would you like to include Twitter Bootstrap (3.0.0)?',
      default: true,
      warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
    }, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.bootstrap = props.bootstrap;

      cb();
    }.bind(this));
  };

  Generator.prototype.askForSass = function askForSass() {
    var cb = this.async();

    this.prompt({
      name: 'compasssass',
      message: 'Would you like to have SASS/SCSS compatibility?',
      default: false,
      warning: 'Yes: You have to install Ruby/Sass/Compass manually.'
    }, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.compasssass = props.compasssass;

      cb();
    }.bind(this));
  };

  Generator.prototype.askForBBVAFront = function askForBBVAFront() {
    var cb = this.async();

    this.prompt({
      name: 'bbvafront',
      message: 'Would you like to include BBVA Front Library?',
      default: true,
      warning: 'Yes: BBVA Front library will be placed into the app/vendor directory.'
    }, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.bbvafront = props.bbvafront;

      cb();
    }.bind(this));
  };

  Generator.prototype.askForModules = function askForModules() {
    var cb = this.async();

    var prompts = [{
      name: 'resourceModule',
      message: 'Would you like to include angular-resource.js?',
      default: true,
      warning: 'Yes: angular-resource added to bower.json'
    }, {
      name: 'cookiesModule',
      message: 'Would you like to include angular-cookies.js?',
      default: true,
      warning: 'Yes: angular-cookies added to bower.json'
    }, {
      name: 'sanitizeModule',
      message: 'Would you like to include angular-sanitize.js?',
      default: true,
      warning: 'Yes: angular-sanitize added to bower.json'
    }];

    this.prompt(prompts, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.resourceModule = props.resourceModule;
      this.cookiesModule = props.cookiesModule;
      this.sanitizeModule = props.sanitizeModule;

      cb();
    }.bind(this));
  };

}

Generator.prototype.createIndexHtml = function createIndexHtml() {

  var appPath = this.env.options.appPath;

  if(this.isApp){
    this.template('../../templates/common/index.html', path.join("app", 'index.jsp'));
  }else{
    this.template('../../templates/common/indexwidget.html', path.join(appPath, 'index.html'));
  }

};

Generator.prototype.packageFiles = function () {
  
  var appPath = this.env.options.appPath;

  this.template('../../templates/common/config.json', path.join(appPath, '/config.json'));
  this.template('../../templates/common/package.json', 'package.json');
  this.template('../../templates/common/bower.json', 'bower.json');
  
  if(this.isApp){
    appPath = '.';
    this.template('../../templates/common/Gruntfile.js', path.join(appPath, 'Gruntfile.js'));
  }else{
    this.template('../../templates/common/GruntfileWidget.js', path.join(appPath, 'Gruntfile.js'));
  };
   
  this.template('../../templates/common/gae.json', path.join(appPath, 'gae.json'));
  this.template('../../templates/common/package.json', path.join(appPath, 'package.json'));
  this.template('../../templates/common/bower.json', path.join(appPath, 'bower.json'));
  this.template('../../templates/common/root/extra/.bowerrc', path.join(appPath, '.bowerrc'));
  this.template('../../templates/common/proxy.js', path.join(appPath, 'proxy.js'));
  
};