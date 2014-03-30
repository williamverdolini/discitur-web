module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    shell: {
      options : {
        stdout: true
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: './node_modules/.bin/bower install'
      },
      font_awesome_fonts: {
        command: 'cp -R bower_components/components-font-awesome/font app/font'
      }
    },

    connect: {
      options: {
          base: 'app/'
      },
      webserver: {
        options: {
          port: 8888,
          keepalive: true
        }
      },
      devserver: {
        options: {
          port: 8888
        }
      },
      testserver: {
          options: {
              //base: 'app/',
              port: 9999
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: 5555,
          keepalive: true
        }
      }
    },

    open: {
      devserver: {
        path: 'http://localhost:8888'
      },
      coverage: {
        path: 'http://localhost:5555'
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      junit: {
        configFile: './test/karma-unit.jasmine.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './test/karma-unit.conf.js'
      },
      junit_auto: {
        configFile: './test/karma-unit.jasmine.conf.js'
      },
      midway: {
        configFile: './test/karma-midway.conf.js',
        autoWatch: false,
        singleRun: true
      },
      midway_auto: {
        configFile: './test/karma-midway.conf.js'
      },
      e2e: {
        configFile: './test/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      },
      e2e_auto: {
        configFile: './test/karma-e2e.conf.js'
      }
    },
    
    protractor: {
      options: {
        configFile: './node_modules/protractor/referenceConf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: true,
        args: {
            // Arguments passed to the command
        }
      },
      test: {
        configFile: './test/ptorConf.js', // Target-specific config file
        //keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false,
        options: {
            args: {} // Target-specific arguments
        }
      },
      test_auto: {
        configFile: './test/ptorConf.js', // Target-specific config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false,
        options: {
            args: {} // Target-specific arguments
        }
        
      }
    },

    watch: {
      assets: {
        files: ['app/styles/**/*.css','app/modules/**/*.js','test/e2ePro/*.js'],
        tasks: ['concat']
      },
      tdd: {
        files: ['app/modules/**/*.js','test/e2ePro/*.js','test/e2ePro/**/*.js'],
        tasks: ['protractor:test_auto']
      },
      tdd_suite: {
        files: ['app/modules/**/*.js','test/e2ePro/*.js','test/e2ePro/**/*.js'],
        tasks: ['protractor:test_auto', 'karma:midway']
      }
    },

    concat: {
      styles: {
        dest: './app/assets/app.css',
        src: [
          'app/styles/reset.css',
          'bower_components/components-font-awesome/css/font-awesome.css',
          'bower_components/bootstrap.css/css/bootstrap.css',
          'app/styles/app.css'
        ]
      },
      css: {
          dest: './app/assets/app.css',
          src: [
            //'./app/bower_components/bootstrap/dist/css/bootstrap.min.css',
            //'./app/bower_components/bootstrap/dist/css/flatly-bootstrap.min.css',
            './app/css/social-buttons-3.css',
            './app/css/discitur.css'
          ]
      },

      libraries: {
          options: {
              separator: ';'
          },
          dest: './app/assets/libraries.js',
          src: [
          './app/bower_components/jquery/jquery.js',
          './app/bower_components/angular/angular.js',
          './app/bower_components/angular-resource/angular-resource.js',
          './app/bower_components/angular-cookies/angular-cookies.js',
          './app/bower_components/angular-sanitize/angular-sanitize.js',
          './app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
          './app/bower_components/angular-ui-router/release/angular-ui-router.js',
          //'./app/bower_components/tinymce/tinymce.min.js',
          './app/bower_components/angular-ui-tinymce/src/tinymce.js'
          ]
      },
      app: {
        options: {
          separator: ';'
        },
        dest: './app/assets/app.js',
        src: [
          './app/modules/common/CommonConfig.js',
          './app/modules/lesson/LessonConfig.js',
          './app/modules/user/UserConfig.js',
          './app/modules/common/LabelDictionary.js',
          './app/modules/common/LabelService.js',
          './app/modules/common/CommonConfig.js',
          './app/modules/common/wrInputDrv.js',
          './app/modules/common/socialBarDrv.js',
          './app/modules/common/pwCheckDrv.js',
          './app/modules/lesson/LessonService.js',
          './app/modules/lesson/LessonCommentDrv.js',
          './app/modules/lesson/LessonRatingDrv.js',
          './app/modules/lesson/LessonCtrl.js',
          './app/modules/lesson/LessonSideBarCtrl.js',
          './app/modules/lesson/Lesson404Ctrl.js',
          './app/modules/lesson/LessonListCtrl.js',
          './app/modules/lesson/LessonSearchCtrl.js',
          './app/modules/lesson/LessonAdvSearchCtrl.js',
          './app/modules/lesson/LessonListSideBarCtrl.js',
          './app/modules/lesson/LessonEditCtrl.js',
          './app/modules/user/UserService.js',
          './app/modules/user/UserNavBarCtrl.js',
          './app/modules/user/UserSignInCtrl.js',
          './app/modules/user/UserProfileCtrl.js',
          './app/modules/main/DisciturApp.js',
          './app/modules/main/doSignInDrv.js',
          './app/modules/main/DisciturBaseCtrl.js',
          './app/modules/main/DisciturRootCtrl.js',
          './app/modules/navigation/NavCtrl.js'

          //'app/modules/**/*.js'
        ]
      }
    },

    cssmin : {
        css:{
            src: './app/assets/app.css',
            dest: './app/assets/app.min.css'
        }
    },

    uglify: {
        libraries: {
            files: {
                './app/assets/libraries.min.js': ['./app/assets/libraries.js']
            }
        },
        app: {
            options: {
                mangle: true,
                beautify: {
                    ascii_only: true
                }
            },
            files: {
                './app/assets/app.min.js': ['./app/assets/app.js']
            }
        }
    }


  });


  grunt.registerTask('test', ['connect:testserver','karma:unit','karma:midway', 'karma:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:junit', ['karma:junit']);
  grunt.registerTask('test:midway', ['connect:testserver','karma:midway']);
  grunt.registerTask('test:e2e', ['connect:testserver', 'karma:e2e']);
  grunt.registerTask('test:e2e-Pro', ['connect:testserver','protractor:test']);

  //keeping these around for legacy use
  grunt.registerTask('autotest', ['autotest:unit']);
  grunt.registerTask('autotest:unit', ['connect:testserver','karma:unit_auto']);
  grunt.registerTask('autotest:junit', ['connect:testserver','karma:junit_auto']);
  grunt.registerTask('autotest:midway', ['connect:testserver','karma:midway_auto']);
  grunt.registerTask('autotest:e2e', ['connect:testserver','karma:e2e_auto']);
  grunt.registerTask('autotest:e2e-Pro', ['connect:testserver','protractor:test_auto','watch:tdd']);

  grunt.registerTask('autotest:suite', ['connect:testserver','protractor:test_auto','karma:midway','watch:tdd']);


  //installation-related
  grunt.registerTask('install', ['shell:npm_install','shell:bower_install','shell:font_awesome_fonts']);

  //defaults
  grunt.registerTask('default', ['dev']);

  //development
  grunt.registerTask('dev', ['install', 'concat', 'connect:devserver', 'open:devserver', 'watch:assets']);

  //server daemon
  grunt.registerTask('serve', ['connect:webserver']);

  grunt.registerTask('minifyjs', ['concat:libraries', 'concat:app', 'uglify']);
  
  //grunt.registerTask('test-e2e-local', ['protractor:testLocal']);
  
};
