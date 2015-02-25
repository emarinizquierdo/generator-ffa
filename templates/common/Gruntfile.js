'use strict';

var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        name: 'name'
    };

    try {
        yeomanConfig.name = require('./bower.json').name || yeomanConfig.name;
        yeomanConfig.appPath = require('./bower.json').appPath || (yeomanConfig.app + '/' + yeomanConfig.name);

    } catch (e) {}

    try {
        gaeConfig.appengineSdkPath = require('./gae.json').appengineSdkPath || "C:/appengine-java-sdk-1.8.1.1/bin/dev_appserver.cmd";
        gaeConfig.warPath = require('./gae.json').warPath || ".";
        gaeConfig.address = require('./gae.json').address || "0.0.0.0";
        gaeConfig.port = require('./gae.json').port || "8888";
    } catch (e) {}

    //Destination to cssmin and uglify
    yeomanConfig.cssminDest = {};
    yeomanConfig.cssminDest['dist/' + yeomanConfig.name + '/styles/css/main.css'] = [yeomanConfig.appPath + '/styles/css/{,*/}*.css'];
    yeomanConfig.uglifyDest = {};
    yeomanConfig.uglifyDest['dist/' + yeomanConfig.name + 'scripts/scripts.js'] = [yeomanConfig.appPath + '/scripts/scripts.js'];

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'app/index.jsp', 'app/<%= yeoman.name %>/{,*/}*.html',
                    'app/{.tmp,<%= yeoman.name %>}/styles/{,*/}*.css',
                    'app/{.tmp,<%= yeoman.name %>}/scripts/{,*/}*.js',
                    'app/<%= yeoman.name %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 8888,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                base: 'app'
            },
            server: {
                middleware: function(connect) {
                    return [
                        connect.static(options.base)
                    ];
                }
            },
            test: {
                middleware: function(connect) {
                    return [
                        connect.static(options.base)
                    ];
                }
            },
            dist: {
                middleware: function(connect) {
                    return [
                        connect.static(yeomanConfig.dist)
                    ];
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                url: 'http://localhost:8080'
            },
            testkarma: {
                url: 'http://localhost:8080/_karma_'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        yeomanConfig.dist + '/*', yeomanConfig.dist + '/.git*'
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
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: yeomanConfig.appPath + '/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: yeomanConfig.dist + '/images'
                }]
            }
        },
        cssmin: {
            options: {
                banner: '/* ' + yeomanConfig.name + ' - <%= revision %> \n' +
                    ' * <%= grunt.template.today("dd/mm/yyyy") %> \n' +
                    ' */\n'
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/<%= yeoman.name %>/styles/main.css': [
                        '<%= yeoman.dist %>/<%= yeoman.name %>/styles/main.css'
                    ]
                }
            }
        },
        <%
        if (compasssass) { %>
            compass: {
                server: {
                    options: {
                        sassDir: yeomanConfig.appPath + '/styles/scss',
                        cssDir: yeomanConfig.appPath + '/styles/css',
                        force: true
                    }
                }
            }, <%
        } %>
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: false,
                    removeRedundantAttributes: false,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: yeomanConfig.app,
                    src: [yeomanConfig.name + '/partials/*.html', yeomanConfig.name + '/views/*.html'],
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
                        '*.html',
                        'vendor/**/*',
                        yeomanConfig.name + '/lang/**/*',
                        yeomanConfig.name + '/styles/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: yeomanConfig.dist + '/' + yeomanConfig.name + '/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            au: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: yeomanConfig.app,
                    dest: yeomanConfig.dist,
                    src: [
                        'docApp/**/*'
                    ]
                }]
            },
            dev: {
                files: [{
                    cwd: yeomanConfig.app,
                    expand: true,
                    src: [
                        '*.{ico,png,txt,html,jsp}',
                        '.htaccess',
                        yeomanConfig.name + '/**/*',
                        'docApp/**/*',
                        'vendor/**/*'
                    ],
                    dest: yeomanConfig.dist
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
                configFile: yeomanConfig.appPath + '/test/karma-unit.conf.js',
            },
            e2e: {
                configFile: yeomanConfig.appPath + '/test/karma-e2e.conf.js',
            },
            e2esinglerun: {
                configFile: yeomanConfig.appPath + '/test/karma-e2e.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
            }
        },
        cdnify: {
            dist: {
                html: [yeomanConfig.dist + '/' + yeomanConfig.name + '/*.html']
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
                banner: '/* ' + yeomanConfig.name + ' - <%= revision %> \n' +
                    ' * <%= grunt.template.today("dd/mm/yyyy") %> \n' +
                    ' */\n'
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/<%= yeoman.name %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/<%= yeoman.name %>/scripts/scripts.js'
                    ]
                }
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
        gaej: {
            options: {
                appengineSdkPath: gaeConfig.appengineSdkPath,
                warPath: gaeConfig.warPath,
                address: gaeConfig.address,
                port: gaeConfig.port
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
            distwebxml: {
                files: {
                    'WEB-INF/web.xml': 'WEB-INF/web.xml'
                },
                options: {
                    replacements: [{
                        pattern: "<jsp-file>/app/index.jsp</jsp-file>",
                        replacement: "<jsp-file>/dist/index.jsp</jsp-file>"
                    }]
                }
            },
            revertwebxml: {
                files: {
                    'WEB-INF/web.xml': 'WEB-INF/web.xml'
                },
                options: {
                    replacements: [{
                        pattern: "<jsp-file>/dist/index.jsp</jsp-file>",
                        replacement: "<jsp-file>/app/index.jsp</jsp-file>"
                    }]
                }
            },
        },
        rename: {
            dist: {
                files: [{
                    src: ['<%= yeoman.app %>/index.jsp'],
                    dest: '<%= yeoman.app %>/index.html'
                }]
            },
            revert: {
                files: [{
                    src: ['<%= yeoman.app %>/index.html'],
                    dest: '<%= yeoman.app %>/index.jsp'
                }, {
                    src: ['<%= yeoman.dist %>/index.html'],
                    dest: '<%= yeoman.dist %>/index.jsp'
                }]
            }
        },
        manifest: {
            dev: {
                options: {
                    basePath: './' + yeomanConfig.app,
                    network: ['*'],
                    preferOnline: false,
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ['index.jsp']
                },
                src: [
                    yeomanConfig.name + '/**/*.{js,html,ico,png,jpg}', 'vendor/**/*.{js,html,ico,png,jpg}'
                ],
                dest: yeomanConfig.app + '/manifest.appcache'
            },
            dist: {
                options: {
                    basePath: './' + yeomanConfig.dist,
                    network: ['*'],
                    preferOnline: false,
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ['index.jsp']
                },
                src: [
                    yeomanConfig.name + '/**/*.{js,html,ico,png,jpg}', 'vendor/**/*.{js,html,ico,png,jpg}'
                ],
                dest: yeomanConfig.app + '/manifest.appcache'
            }
        },
        ngtemplates: {
            app: {
                cwd: yeomanConfig.app,
                src: [yeomanConfig.name + '/partials/*.html', yeomanConfig.name + '/views/*.html'],
                dest: yeomanConfig.app + '/' + yeomanConfig.name + '/scripts/templates/templates.js',
                options: {
                    module: yeomanConfig.name + 'App',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: false,
                        removeAttributeQuotes: false,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: false,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        ngdocs: {
            options: {
                scripts: [
                    yeomanConfig.app + '/vendor/jquery/dist/jquery.min.js',
                    'angular.js'
                ],
                styles: [yeomanConfig.appPath + '/styles/css/main.css'],
                animation: true,
                dest: yeomanConfig.app + '/docs',
            },
            appDoc: {
                src: [yeomanConfig.appPath + '/scripts/**/*.js'],
                title: yeomanConfig.name
            }
        }
    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run([
                'clean',
                'build:rtest:au-bbva.com',
                'open:server',
                'connect:dist',
                'watch'
            ]);
        } else if (target === 'gae') {
            return grunt.task.run([
                'open:server', <%
                if (compasssass) { %>
                    'compass:server', <%
                } %>
                'concurrent:gaeserver'
            ]);
        } else {
            return grunt.task.run([
                'open:server', <%
                if (compasssass) { %>
                    'compass:server', <%
                } %>
                'connect:server',
                'watch'
            ]);
        }
    });

    grunt.registerTask('test', function(target) {
        if (target === 'unit') {
            return grunt.task.run([
                'clean', <%
                if (compasssass) { %>
                    'compass:server', <%
                } %>
                'connect:test',
                'open:test',
                'open:testkarma',
                'karma:unit'
            ]);
        } else if (target === 'build') {
            return grunt.task.run([
                'clean',
                'connect:test',
                'karma:unit',
                'karma:e2esinglerun'
            ]);
        } else {
            return grunt.task.run([
                'clean',
                'connect:test',
                'open:test',
                'open:testkarma',
                'karma:e2e'
            ]);
        }
    });

    grunt.registerTask('build', function(p_revision, p_env) {

        var minifyEnv = ['bbva.com', 'au-bbva.com'];

        //Get app revision  
        if (!p_revision) {
            grunt.log.writeln('WARNING: No revision defined');
        }

        var revision = p_revision || 'NO_REVISION';
        grunt.log.writeln('Revision: ' + revision);
        grunt.config.set('revision', revision);

        //Get app environment
        if (!p_env) {
            grunt.log.writeln('ERROR: No environment defined');
            return false;
        }

        grunt.log.write('Environment: ' + p_env);
        grunt.config.set('env', p_env);

        grunt.task.run('clean');

        if (minifyEnv.indexOf(p_env) !== -1) {
            grunt.task.run([
                'rename:dist',
                'ngtemplates',
                'useminPrepare', <%
                if (compasssass) { %>
                    'compass:server', <%
                } %>
                'imagemin',
                'htmlrefs',
                'concat',
                'copy:dist',
                'cssmin',
                'cdnify',
                'ngmin',
                'uglify',
                'rev',
                'usemin',
                'rename:revert',
                //'string-replace:dist',
                //'string-replace:distwebxml'
            ]);
        } else {
            grunt.task.run([
                'copy:dev',
                'ngdocs'
            ]);
        }

        if (p_env == minifyEnv[1]) {
            grunt.task.run([
                'copy:au'
            ]);
        }

    });

    grunt.registerTask('revertAppengineWeb', [
        'string-replace:revert',
        'string-replace:revertwebxml'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test:build',
        'build'
    ]);

};
