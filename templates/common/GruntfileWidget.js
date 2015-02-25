'use strict';

// Nodejs libs.
var grunt = require('grunt');
var path = require('path');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(function(p_dependency){
    loadRemoteNpmTasks('../../node_modules/', p_dependency);
  });

  // configurable paths
  var yeomanConfig = {
    app: '.',
    dist: 'dist',
    name: 'name'
  };

  //gae default configuration
  var gaeConfig = {
    appengineSdkPath: 'appengineSdkPath',
    warPath: 'warPath',
    address: 'address',
    port: 'port'
  };

  try {
    yeomanConfig.name = require('./bower.json').name || yeomanConfig.name;
    yeomanConfig.appPath = require('./bower.json').appPath || ( yeomanConfig.app + '/' + yeomanConfig.name);
    
  } catch (e) {}

  try {
    gaeConfig.appengineSdkPath = require('./gae.json').appengineSdkPath || 'C:/appengine-java-sdk-1.8.1.1/bin/dev_appserver.cmd';
    gaeConfig.warPath = require('./gae.json').warPath || '.';
    gaeConfig.address = require('./gae.json').address || '0.0.0.0';
    gaeConfig.port = require('./gae.json').port || '8881';
  } catch (e) {}

  var auxNgTemplate = {};
  auxNgTemplate[yeomanConfig.name] = {
    src:      ['templates/**.html', 'styles/css/**.css'],
    dest:     'scripts/templates/templates.js'
  };

  //Destination to cssmin and uglify
  yeomanConfig.cssminDest = {};
  yeomanConfig.cssminDest['dist/' + yeomanConfig.name + '/styles/css/main.css'] = [yeomanConfig.appPath + '/styles/css/{,*/}*.css'];
  yeomanConfig.uglifyDest = {};
  yeomanConfig.uglifyDest['dist/' + yeomanConfig.name + 'scripts/scripts.js'] = [yeomanConfig.appPath + '/scripts/scripts.js'];

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        livereload: 44444
      },
      scripts: {
        files: [
          yeomanConfig.app + '/index.html',
          yeomanConfig.app + '/{,*/}*.html',
          yeomanConfig.app + '/styles/css/{,*/}*.css',
          yeomanConfig.app + '/scripts/{,*/}*.js',
          yeomanConfig.app + '/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          yeomanConfig.app + '/styles/scss/{,*/}*.{sass,scss}'
        ]<% if (compasssass) { %>,
        tasks: ['compass:server']<% } %>
      }
    },
    connect: {
      options: {
        port: 8881,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        base: '..'
      },
      server: {
        middleware: function (connect) {
          return [
            connect.static(connect.options.base)
          ];
        }
      },
      test: {
        middleware: function (connect) {
          return [
            connect.static(connect.options.base)
          ];
        }
      },
      dist: {
        middleware: function (connect) {
          return [
            connect.static(connect.options.base + '/' + yeomanConfig.appPath + '/' + yeomanConfig.dist)
          ];
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%%= connect.options.port %>/' + yeomanConfig.name + '/index.html'
      },
      test: {
        url: 'http://localhost:8080'
      },
      testkarma : {
        url: 'http://localhost:8080/_karma_'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            yeomanConfig.dist + '/*'
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        yeomanConfig.appPath + '/scripts/{,*/}*.js'
      ]
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            yeomanConfig.dist + '/' + yeomanConfig.name + '/scripts/{,*/}*.js',
            yeomanConfig.dist + '/' + yeomanConfig.name + '/styles/css/{,*/}*.css',
            yeomanConfig.dist + '/' + yeomanConfig.name + '/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            yeomanConfig.appPath + '/' + yeomanConfig.name + '/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: yeomanConfig.app + '/index.html',
      options: {
        dest: yeomanConfig.dist
      }
    },
    usemin: {
      html: [yeomanConfig.dist + '/{,*/}*.html'],
      css: [yeomanConfig.dist + '/' + yeomanConfig.name + '/styles/css/{,*/}*.css'],
      options: {
        dirs: [yeomanConfig.dist]
      }
    },
    cssmin: {
      options: {
        banner: '/* ' + yeomanConfig.name + ' - <%%= revision %> \n' +
                ' * <%%= grunt.template.today("dd/mm/yyyy") %> \n' +
                ' */\n'
      },
      dist: {
        files: yeomanConfig.cssminDest
      },
    },<% if (compasssass) { %>
    compass: {
      server: {
        options: {
          sassDir: yeomanConfig.appPath + '/styles/scss',
          cssDir: yeomanConfig.appPath + '/styles/css',
          force: true
        }
      }
    },<% } %>
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: yeomanConfig.app,
          src: ['*.html', yeomanConfig.name + '/views/*.html'],
          dest: yeomanConfig.dist
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: yeomanConfig.app,
          dest: yeomanConfig.dist,
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'vendor/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: yeomanConfig.dist + '/' + yeomanConfig.name +  '/images',
          src: [
            'generated/*'
          ]
        }]
      },
      prebuild: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'styles/css',
          dest: 'styles/auxcss',
          src: ['*']
        }]
      },
      postbuild: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'styles/auxcss',
          dest: 'styles/css',
          src: ['*']
        }]
      }
    },
    concurrent: {
      gaeserver: [
        'watch',
        'gaej'
      ],
      options: {
        logConcurrentOutput: true
      }
    },
    karma: {
      unit: {
        configFile: yeomanConfig.appPath + '/test/karma-unit.conf.js'
      },
      e2e: {
        configFile: yeomanConfig.appPath + '/test/karma-e2e.conf.js'
      },
      e2esinglerun: {
        configFile: yeomanConfig.appPath + '/test/karma-e2e.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: yeomanConfig.dist + '/' + yeomanConfig.name + '/scripts',
          src: '*.js',
          dest: yeomanConfig.dist + '/' + yeomanConfig.name + '/scripts'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/* ' + yeomanConfig.name + ' - <%%= revision %> \n' +
                ' * <%%= grunt.template.today("dd/mm/yyyy") %> \n' +
                ' */\n'
      },
      dist: {
        files: yeomanConfig.uglifyDest
      }
    },
    htmlrefs: {
      dist: {
        /** @required  - string including grunt glob variables */
        src: yeomanConfig.dist + '/index.html',
        /** @optional  - string directory name*/
        dest: yeomanConfig.dist + '/'
      }
    },
    'string-replace': {
      dist: {
        files: {
          'WEB-INF/appengine-web.xml': 'WEB-INF/appengine-web.xml'
        },
        options: {
          replacements: [{
            pattern: '<public-root>/app/</public-root>',
            replacement: '<public-root>/dist/</public-root>'
          }]
        }
      },
      revert: {
        files: {
          'WEB-INF/appengine-web.xml': 'WEB-INF/appengine-web.xml'
        },
        options: {
          replacements: [{
            pattern: '<public-root>/dist/</public-root>',
            replacement: '<public-root>/app/</public-root>'
          }]
        }
      },
    },
    gaej: {
      options: {
        appengineSdkPath: gaeConfig.appengineSdkPath,
        warPath: gaeConfig.warPath,
        address: gaeConfig.address,
        port: gaeConfig.port
      }
    },
    ngtemplates: auxNgTemplate,
    encodeImages: {
      dist: {
        files: [{
          expand: true,
          cwd: yeomanConfig.app +'/styles/css/',
          src: '{,*/}*.css',
          dest: 'styles/css/'
        }]
      }
    },
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'open:server',
        'connect:dist',
        'watch'
      ]);
    }else if (target === 'gae') {
      return grunt.task.run([
        'copy:prebuild',
        'encodeImages',
        'ngtemplates',
        'open:server',<% if (compasssass) { %>
        'compass:server',<% } %>
        'concurrent:gaeserver',
        'copy:postbuild'
      ]);
    }else{
      return grunt.task.run([
        'copy:prebuild',
        'encodeImages',
        'ngtemplates',
        'open:server',<% if (compasssass) { %>
        'compass:server',<% } %>
        'connect:server',
        'watch',
        'copy:postbuild'
      ]);
    }
  });

  grunt.registerTask('test', function (target) {
    if (target === 'unit') {
      return grunt.task.run([
        'clean',<% if (compasssass) { %>
        'compass:server',<% } %>
        'connect:test',
        'karma:unit'
      ]);
    }else if(target === 'build'){
      return grunt.task.run([
        'clean',
        'connect:test',
        'karma:unit',
        'karma:e2esinglerun',
      ]);
    }else{
      return grunt.task.run([
        'clean',
        'connect:test',
        'open:test',
        'open:testkarma',
        'karma:e2e'
      ]);
    }
  });

  grunt.registerTask('build', function(pRevision, pEnv){
    
    var minifyEnv = ['bbva.com', 'au-bbva.com'];
    
    //Get app revision  
    if (!pRevision){
      grunt.log.writeln('ERROR: No revision defined');
    }
    
    var revision = pRevision || 'NO_REVISION';
    grunt.log.writeln('Revision: ' + revision);
    grunt.config.set('revision', revision);
      
    //Get app environment
    if (!pEnv){
      grunt.log.writeln('ERROR: No environment defined');
    }

    var environment = pEnv || 'bbva.com';
    grunt.log.write('Environment: ' + environment);
    grunt.config.set('env', environment);

    grunt.task.run('clean');
    
    if (minifyEnv.indexOf(environment) !== -1) {
      grunt.task.run([
        'copy:prebuild',
        'encodeImages',
        'ngtemplates',
        'useminPrepare',<% if (compasssass) { %>
        'compass:server',<% } %>
        'cssmin',
        'htmlmin',
        'htmlrefs',
        'concat',
        'copy:dist',
        'ngmin',
        'uglify',
        'rev',
        'usemin',
        'copy:postbuild'
      ]);
    }
    else {
      grunt.task.run('copy:dev');
    }
    
    grunt.task.run('string-replace:dist');

  });

  grunt.registerTask('revertAppengineWeb', [
    'string-replace:revert'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test:build',
    'build'
  ]);

};

//This function is to provide to grunt.loadNpmTask a way to load a non local npm module and re-use the already existents
function loadRemoteNpmTasks(remoteDir, task) {
    var pkgfile = path.join(remoteDir, task, 'package.json');
    var pkg = grunt.file.exists(pkgfile) ? grunt.file.readJSON(pkgfile) : {keywords: []};

    // Process collection plugins.
    if (pkg.keywords && pkg.keywords.indexOf('gruntcollection') !== -1) {
      loadTaskDepth++;
      Object.keys(pkg.dependencies).forEach(function(depName) {
        // Npm sometimes pulls dependencies out if they're shared, so find
        // upwards if not found locally.
        var filepath = grunt.file.findup('node_modules/' + depName, {
          cwd: path.resolve('node_modules', task),
          nocase: true
        });
        if (filepath) {
          // Load this task plugin recursively.
          task.loadNpmTasks(path.relative(remoteDir, filepath));
        }
      });
      loadTaskDepth--;
      return;
    }

    // Process task plugins.
    var tasksdir = path.join(remoteDir, task, 'tasks');
    if (grunt.file.exists(tasksdir)) {
      grunt.loadTasks(tasksdir);
    } else {
      grunt.log.error('Npm module "' + task + '" in ' + remoteDir + ' not found. Is it installed?');
    }
};