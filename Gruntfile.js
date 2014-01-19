module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
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

      scripts: {
        options: {
          separator: ';'
        },
        dest: './app/assets/app.js',
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
          'app/modules/**/*.js'
        ]
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
  
  //grunt.registerTask('test-e2e-local', ['protractor:testLocal']);
  
};
