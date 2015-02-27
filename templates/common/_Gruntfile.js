'use strict';

var modRewrite = require('connect-modrewrite');
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

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

    //Destination to cssmin and uglify
    yeomanConfig.cssminDest = {};
    yeomanConfig.cssminDest['dist/' + yeomanConfig.name + '/styles/css/main.css'] = [yeomanConfig.appPath + '/styles/css/{,*/}*.css'];
    yeomanConfig.uglifyDest = {};
    yeomanConfig.uglifyDest['dist/' + yeomanConfig.name + 'scripts/scripts.js'] = [yeomanConfig.appPath + '/scripts/scripts.js'];

    grunt.initConfig({
        yeoman: yeomanConfig,
        connect: {
            options: {
                port: 8888,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                base: 'app',
                open: true,
                keepalive: true
            },
            server: {
                options: {
                    middleware: function(connect) {
                        return [
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg$ /index.html [L]']),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
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
        filerev: {
            dist: {
                src: [
                    yeomanConfig.dist + '/' + yeomanConfig.name + '/scripts/{,*/}*.js',
                    yeomanConfig.dist + '/' + yeomanConfig.name + '/styles/css/{,*/}*.css',
                    yeomanConfig.dist + '/' + yeomanConfig.name + '/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    yeomanConfig.appPath + '/' + yeomanConfig.name + '/styles/fonts/*'
                ]
            }
        },
        useminPrepare: {
            html: yeomanConfig.app + '/index.html',
            options: {
                dest: yeomanConfig.dist,
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: [yeomanConfig.dist + '/{,*/}*.html'],
            css: [yeomanConfig.dist + '/' + yeomanConfig.name + '/styles/css/{,*/}*.css'],
            options: {
                dirs: [yeomanConfig.dist]
            }
        },
        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //      options: {
        //          banner: '/* ' + yeomanConfig.name + ' - <%%= revision %> \n' +
        //              ' * <%%= grunt.template.today("dd/mm/yyyy") %> \n' +
        //              ' */\n'
        //          },
        //          dist: {
        //          files: {
        //              '<%%= yeoman.dist %>/<%%= yeoman.name %>/styles/css/main.css': [
        //              '<%%= yeoman.dist %>/<%%= yeoman.name %>/styles/css/main.css'
        //              ]
        //          }
        //      }
        //},
        // uglify: {
        //      options: {
        //          banner: '/* ' + yeomanConfig.name + ' - <%%= revision %> \n' +
        //            ' * <%%= grunt.template.today("dd/mm/yyyy") %> \n' +
        //            ' */\n'
        //    },
        //    dist: {
        //        files: {
        //            '<%%= yeoman.dist %>/<%%= yeoman.name %>/scripts/scripts.js': [
        //                '<%%= yeoman.dist %>/<%%= yeoman.name %>/scripts/scripts.js'
        //            ]
        //        }
        //    }
        //},
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true,
                    removeAttributeQuotes: false,
                    removeRedundantAttributes: false,
                    useShortDoctype: true,
                    removeEmptyAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: yeomanConfig.app,
                    src: [yeomanConfig.name + '/partials/*.html', yeomanConfig.name + '/views/*.html'],
                    dest: yeomanConfig.dist
                }]
            }
        },
        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: yeomanConfig.dist + '/' + yeomanConfig.name + '/scripts',
                    src: '*.js',
                    dest: yeomanConfig.dist + '/' + yeomanConfig.name + '/scripts'
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
            dev: {
                files: [{
                    cwd: yeomanConfig.app,
                    expand: true,
                    src: [
                        '*.{ico,png,txt,html,jsp}',
                        '.htaccess',
                        yeomanConfig.name + '/**/*',
                        'vendor/**/*'
                    ],
                    dest: yeomanConfig.dist
                }]
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
                    src: ['<%%= yeoman.app %>/index.jsp'],
                    dest: '<%%= yeoman.app %>/index.html'
                }]
            },
            revert: {
                files: [{
                    src: ['<%%= yeoman.app %>/index.html'],
                    dest: '<%%= yeoman.app %>/index.jsp'
                }, {
                    src: ['<%%= yeoman.dist %>/index.html'],
                    dest: '<%%= yeoman.dist %>/index.jsp'
                }]
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
        }
    });

    grunt.registerTask('serve', function(target) {
        return grunt.task.run([
            'connect:server'
        ]);
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
                'useminPrepare',
                'htmlrefs',
                'concat',
                'ngAnnotate',
                'copy:dist',
                'cssmin',
                'uglify',
                'filerev',
                'usemin',
                'rename:revert'
            ]);
        } else {
            grunt.task.run([
                'copy:dev',
            ]);
        }

    });

    grunt.registerTask('revertAppengineWeb', [
        'string-replace:revert',
        'string-replace:revertwebxml'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);

};
