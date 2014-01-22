describe("Unit - module:Common - Testing Services", function() {
  var $LabelService;

  //excuted before each "it" is run.
  beforeEach(function (){
    
    //load the module.
    module('Common');
    
    //inject your service for testing.
    inject(function(LabelService) {
      $LabelService = LabelService;
    });
  });

  it('should contain a LabelService service', function() {
    expect($LabelService).not.toBe(null);
  });

  it('should LabelService contain get method', function() {
    expect(angular.isFunction($LabelService.get)).toBe(true);
  });

});

describe("Unit - module:Lesson - Testing Services", function () {

  describe("LessonService [signature]", function() {
      var _LessonService;
    
      //excuted before each "it" is run.
      beforeEach(function (){
        
        //load the module.
        module('Lesson');
        
        //inject your service for testing.
        inject(function(LessonService) {
            _LessonService = LessonService;
        });
      });
    
      it('should contain an LabelService service', function () {
          expect(_LessonService).not.toBe(null);
      });
    
      it('should LessonService contain get method', function() {
          expect(angular.isFunction(_LessonService.get)).toBe(true);
      });
    
      it('should LessonService contain search method', function() {
          expect(angular.isFunction(_LessonService.search)).toBe(true);
      });
    
      // I want the real service to read from DB, so it has to be async service
      // So in Angular.js it should return a promise 
      it('should LessonService.search return a promise', function() {
        var promise = _LessonService.search({});
        expect(angular.isFunction(promise.then)).toBe(true);
        expect(angular.isFunction(promise.catch)).toBe(true);
        expect(angular.isFunction(promise.finally)).toBe(true);
      });

      describe('LessonService [signature-parameters]', function () {
          it('Should LessonService.search() not accept no parameter, throw exception otherwise', function () {
              var invalidParamEx;
              //make the call.
              try {
                  var returnedPromise = _LessonService.search();
              }
              catch (ex) {
                  invalidParamEx = ex;
              }

              expect(invalidParamEx).toBeDefined();
              expect(invalidParamEx.code).toBeDefined();
              expect(invalidParamEx.code).toEqual(20001);
          })

          it('Should LessonService.search() accept no strings, throw exception otherwise', function () {
              var invalidParamEx;
              //make the call.
              try {
                  var returnedPromise = _LessonService.search('stringa');
              }
              catch (ex) {
                  invalidParamEx = ex;
              }

              expect(invalidParamEx).toBeDefined();
              expect(invalidParamEx.code).toBeDefined();
              expect(invalidParamEx.code).toEqual(20001);
          })

          it('Should LessonService.search() accept no Array, throw exception otherwise', function () {
              var invalidParamEx;

              //make the call.
              try {
                  var returnedPromise = _LessonService.search([]);
              }
              catch (ex) {
                  invalidParamEx = ex;
              }
              expect(invalidParamEx).toBeDefined();
              expect(invalidParamEx.code).toBeDefined();
              expect(invalidParamEx.code).toEqual(20001);
          })

          it('Should LessonService.search() accept no Function, throw exception otherwise', function () {
              var invalidParamEx;

              //make the call.
              try {
                  var returnedPromise = _LessonService.search(function () { });
              }
              catch (ex) {
                  invalidParamEx = ex;
              }
              expect(invalidParamEx).toBeDefined();
              expect(invalidParamEx.code).toBeDefined();
              expect(invalidParamEx.code).toEqual(20001);
          })

          it('Should LessonService.search() accept Object instance', function () {
              var invalidParamEx;

              //make the call.
              try {
                  var returnedPromise = _LessonService.search({ });
              }
              catch (ex) {
                  invalidParamEx = ex;
              }
              expect(invalidParamEx).not.toBeDefined();
          })

          it('Should LessonService.search() not accept Object with uncorrect parameters, and throws exception', function () {
              var invalidParamEx;
              var inputParams = {
                  color : 'blue'
              }

              var invalidParamEx;

              //make the call.
              try {
                  var returnedPromise = _LessonService.search(inputParams);
              }
              catch (ex) {
                  invalidParamEx = ex;
              }
              expect(invalidParamEx).toBeDefined();
              expect(invalidParamEx.code).toBeDefined();
              expect(invalidParamEx.code).toEqual(20002);
          })

      })

  })

  describe("LessonService [invoke]", function () {
    // The next test I want, should be: Should the LessonService.search() return all the lessons.
    // to create the test I'll have to:
    // - create mock data returned by the service-fake: this is in mock.js, !! I want to share this file with backend-less development 
    // - mock http service: this is done through _$httpBackend (angular-mock)
    // - create a mock for the service.
    //
    var _MockedData,
        _httpBackend,
        _LessonService,
        _DisciturSettings,
        _defQueryString;

    // Befaore each test in the suite I inject the modules needed
    beforeEach(function () {
        //load the module.
      module('Lesson');

      //get your service, also get $httpBackend
      //$httpBackend will be a mock, thanks to angular-mocks.js
      inject(function (MockedData, $httpBackend, LessonService, DisciturSettings) {
        _MockedData = MockedData;
        _httpBackend = $httpBackend;      
        _LessonService = LessonService;
        _DisciturSettings = DisciturSettings;
      });

      _defQueryString = '?orderBy=PublishDate&orderDir=DESC&pageSize=3&startRow=0';
    })
    
    //make sure no expectations were missed in your tests.
    //(e.g. expectGET or expectPOST)
    afterEach(function() {
      _httpBackend.verifyNoOutstandingExpectation();
      _httpBackend.verifyNoOutstandingRequest();
    });
 
    //-------- TEST CASES:
    it('Should the LessonService.search({}) pass default parameters', function () {
        //create an object with a function to spy on.
        var _test = {
            successCB: function () { },
            errorCB: function () { }
        };
        //set up a spy for the callback handler.
        spyOn(_test, 'successCB');
        spyOn(_test, 'errorCB');

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + _defQueryString).respond(_MockedData.lessons)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.search({});

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        //check your spy to see if it's been called with the returned value.  
        //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
        expect(_test.successCB).toHaveBeenCalled();
        expect(_test.errorCB).not.toHaveBeenCalled();
    });

    it('Should the LessonService.search({}) return all the lessons', function () {
      //create an object with a function to spy on.
      var _test = {
        successCB: function () { },
        errorCB: function () { }
      };
      //set up a spy for the callback handler.
      spyOn(_test, 'successCB');
      spyOn(_test, 'errorCB');

      // Create mocked api route.
      // I want to emulate what I will do in real app code, so I use the same config as in the real code
      _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + _defQueryString).respond(_MockedData.lessons)

      //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
      //make the call.
      var returnedPromise = _LessonService.search({});
      
      //use the handler you're spying on to handle the resolution of the promise.
      returnedPromise.then(_test.successCB);
      
      //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------

      //flush the backend to "execute" the request to do the expectedGET assertion.
      _httpBackend.flush();      
      
      //check your spy to see if it's been called with the returned value.  
      //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
      expect(_test.successCB).toHaveBeenCalled();
      expect(_test.errorCB).not.toHaveBeenCalled();
    });

    it('Should the LessonService.search({}) return all the lessons in DT Object Model', function () {
      // Create a test client to explore returned data
      // DO NOT USE Spy (It prevents to callback in promise chain)
      var _test = {
        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        successCB: function (data) {
            for (var i = 0; i < data.length; i++) {
              expect(data[i].author, 'proprieta\' author').toBeDefined();
              expect(data[i].tags, 'proprieta\' tags').toBeDefined();
              expect(data[i].title, 'proprieta\' title').toBeDefined();
              expect(data[i].goods, 'proprieta\' goods').toBeDefined();
              expect(data[i].bads, 'proprieta\' bads').toBeDefined();

              expect(data[i].Author, 'proprieta\' Author').not.toBeDefined();
              expect(data[i].Tags, 'proprieta\' Tags').not.toBeDefined();
              expect(data[i].Title, 'proprieta\' Title').not.toBeDefined();
              expect(data[i].FeedBacks, 'proprieta\' FeedBacks').not.toBeDefined();
            }
        }
        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------
      };

      // Create mocked api route.
      // I want to emulate what I will do in real app code, so I use the same config as in the app code
      _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + _defQueryString).respond(_MockedData.lessons)

      //make the call.
      var returnedPromise = _LessonService.search({});

      //use the handler you're spying on to handle the resolution of the promise.
      returnedPromise.then(_test.successCB);

      //flush the backend to "execute" the request to do the expectedGET assertion.
      _httpBackend.flush();
    });

  })

});


describe("Unit - module:Lesson - Testing Controllers", function () {

    var _Lesson,
        _$httpBackend,
        _LessonService,
        _MockedData,
        _lessonNewsData,
        _rootScope,
        _$controller,
        _DisciturSettings,
        _scope,
        _defQueryString,
        _LabelService,
        _$state;

    // Befaore each test in the suite I inject the modules needed
    beforeEach(function () {
        //load the module.
        module('Lesson');
        //angular.mock.module('Lesson')

        //get your service, also get $httpBackend
        //$httpBackend will be a mock, thanks to angular-mocks.js
        inject(function ($rootScope, $controller, MockedData, LessonService, $httpBackend, DisciturSettings, LabelService) {
            _rootScope = $rootScope;
            _scope = _rootScope.$new();
            _$controller = $controller;
            _MockedData = MockedData;
            _LessonService = LessonService;
            _$httpBackend = $httpBackend;
            _DisciturSettings = DisciturSettings;
            _LabelService = LabelService;
            //_$state = $state
        });

        _defQueryString = '?orderBy=PublishDate&orderDir=DESC&pageSize=3&startRow=0';
        
        _$state = {
            is: function () { },
            go: function () { }
        }
        
    })

    //make sure no expectations were missed in your tests.
    //(e.g. expectGET or expectPOST)
    afterEach(function () {
        _$httpBackend.verifyNoOutstandingExpectation();
        _$httpBackend.verifyNoOutstandingRequest();
    });


    describe('- LessonNewsCtrl -', function () {
        it("Should Exists LessonNewsCtrl controller", function () {
            var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, LabelService: _LabelService, lessonNewsData: [], LessonService: _LessonService, $state: _$state });
            expect(_ctrl).toBeDefined();
        });

        describe("Labels", function () {
            it("Should LessonNewsCtrl have labels object in its $scope", function () {
                //var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, lessonNewsData: [] });
                var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, LabelService: _LabelService, lessonNewsData: [], LessonService: _LessonService, $state: _$state });
                expect(_scope.labels).toBeDefined();
            });

            it("Should LessonNewsCtrl have publishedOn label", function () {
                //var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, lessonNewsData: [] });
                var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, LabelService: _LabelService, lessonNewsData: [], LessonService: _LessonService, $state: _$state });
                expect(_scope.labels.publishedOn).toBeDefined();
            });

            it("Should LessonNewsCtrl have viewMore label", function () {
                //var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, lessonNewsData: [] });
                var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, LabelService: _LabelService, lessonNewsData: [], LessonService: _LessonService, $state: _$state });
                expect(_scope.labels.viewMore).toBeDefined();
            });
        })

        it("Should LessonNewsCtrl have lessons array in its $scope", function () {
            //var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, lessonNewsData: {lessons:[]} });
            var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, LabelService: _LabelService, lessonNewsData: {lessons:[]}, LessonService: _LessonService, $state: _$state });
            expect(_scope.lessons).toBeDefined();
        });

        
        // At first I have to create mock data, but maybe I already have it (MockedData)!
        // With this test I have to start thinking about Service and resolving Data for the Controller
        // So I pause the this test and begin about services
        it("Should LessonNewsCtrl.lessons be populated with lessonNewsData array in input", function () {
            // Create mocked api route with faked response data
            // I want to emulate what I will do in real app code, so I use the same config as in the app code
            _$httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + _defQueryString).respond(_MockedData.lessons)

            //make the call.
            //var returnedPromise = _LessonService.search();
            _LessonService.search({}).then(function (data) { _lessonNewsData = data })
            //flush the backend to "execute" the request to do the expectedGET assertion.
            _$httpBackend.flush();

            //var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, lessonNewsData: _lessonNewsData });
            var _ctrl = _$controller('LessonNewsCtrl', { $scope: _scope, LabelService: _LabelService, lessonNewsData: _lessonNewsData, LessonService: _LessonService, $state: _$state });
            debugger;
            expect(_scope.lessons).toEqual(_lessonNewsData.lessons)

        });
        

    })

    describe('- LessonSearchCtrl -', function () {

        var _LabelService,
            _$state;

        beforeEach(function () {
            _LabelService = { 
                get: function () { } 
            }
            _$state = { 
                is: function () { }, 
                go: function () { }
            }
        })

        it("Should Exists LessonSearchCtrl controller", function () {
            var _ctrl = _$controller('LessonSearchCtrl', { $scope: _scope, $rootScope: _rootScope, LabelService: _LabelService, $state: _$state });
            expect(_ctrl).toBeDefined();
        });

        it('Should exists method search in scope', function () {
            var _ctrl = _$controller('LessonSearchCtrl', { $scope: _scope, $rootScope: _rootScope, LabelService: _LabelService, $state: _$state });
            expect(angular.isFunction(_scope.search)).toBe(true);
        })

        // Removed search method always call $state managent (ui-router)
        /*
        it('Should $scope.search method broadcast LessonSearchEvent event (if in $state= \'lessonSearch\')', function () {
            var _$stateIn = {
                is: function (state) { return true; }, // mock case of lessonNews or lessonSearch
                go: function (newState, stateParams) { }
            }

            var _ctrl = _$controller('LessonSearchCtrl', { $scope: _scope, $rootScope: _rootScope, LabelService: _LabelService, $state: _$stateIn });

            spyOn(_rootScope, '$broadcast');

            _scope.keyword = 'keywordToSearch'
            _scope.search({});

            expect(_rootScope.$broadcast).toHaveBeenCalled();
            expect(_rootScope.$broadcast).toHaveBeenCalledWith('LessonSearchEvent', { keyword: 'keywordToSearch' });
        })

        it('Should $scope.search redirect to $state \'lessonNews\' and send keyword to $stateParams (if in $state!= \'lessonNews\')', function () {

            var _$stateIn = {
                is: function (state) { return false; }, // mock case of lessonNews or LessonSearch
                go: function (newState, stateParams) { }
            }

            var _ctrl = _$controller('LessonSearchCtrl', { $scope: _scope, $rootScope: _rootScope, LabelService: _LabelService, $state: _$stateIn });

            spyOn(_$stateIn, 'go');

            _scope.keyword = 'keywordToSearch'
            _scope.search({});

            expect(_$stateIn.go).toHaveBeenCalled();
            expect(_$stateIn.go).toHaveBeenCalledWith('lessonSearch', { keyword: 'keywordToSearch' });
        })
        */
    })
    
})


