module.exports = function(config) {
  var conf = {
              basePath: '../',
              frameworks: ['jasmine'],
              reporters: ['progress'],
              browsers: ['Chrome'],
              //browsers: ['PhantomJS'],
              autoWatch: true,
          
              // these are default values anyway
              //singleRun: false,
              colors: true,
              //logLevel : 'config.LOG_DEBUG',
              
              files : [
                //3rd Party Code
                'app/bower_components/jquery/jquery.js',
                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-resource/angular-resource.js',
                'app/bower_components/angular-cookies/angular-cookies.js',
                'app/bower_components/angular-sanitize/angular-sanitize.js',
                //'app/bower_components/angular-route/angular-route.js',
                'app/bower_components/angular-ui-router/release/angular-ui-router.js',
                'app/bower_components/angular-bootstrap/ui-bootstrap.js',
                //'app/bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
                //'app/scripts/lib/router.js',
          
                //App-specific Code
                //'app/scripts/config/config.js',
                //'app/scripts/services/**/*.js',
                //'app/scripts/directives/**/*.js',
                //'app/scripts/controllers/**/*.js',
                //'app/scripts/filters/**/*.js',
                //'app/scripts/config/routes.js',
                //'app/scripts/app.js',
                
                'app/css/flatly-bootstrap.min.css',
                'app/modules/common/*.js',
                'app/modules/user/UserConfig.js',
                'app/modules/user/*.js',
                'app/modules/lesson/LessonConfig.js',
                'app/modules/lesson/*.js',
                'app/modules/main/DisciturApp.js',
                'app/modules/main/DisciturRootCtrl.js',
                'app/modules/navigation/NavCtrl.js'
                
                //,
          
                //Test-Specific Code
                //'node_modules/chai/chai.js',
                //'test/lib/chai-should.js',
                //'test/lib/chai-expect.js'
                
              ]
            }
          
  conf.files = conf.files.concat([
    //extra testing code
    // Mocking components:
    'app/bower_components/angular-mocks/angular-mocks.js',
    'mock/modules/lesson/mocks.js',


    //mocha stuff
    //'test/mocha.conf.js',

    //test files
    './test/unit/modules/**/j*.js'
  ]);

  config.set(conf);
};
