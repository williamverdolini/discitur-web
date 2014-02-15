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

  describe("LessonService [signature]", function () {
      var _LessonService;
      var _CommentDTO;

        //excuted before each "it" is run.
        beforeEach(function () {

            //load the module.
            module('Lesson');

            //inject your service for testing.
            inject(function (LessonService, CommentDTO) {
                _LessonService = LessonService;
                _CommentDTO = CommentDTO;
            });
        });
        
        it('should contain an _LessonService service', function () {
            expect(_LessonService).not.toBe(null);
        });
        
        it('should LessonService contain get method', function () {
            expect(angular.isFunction(_LessonService.get)).toBe(true);
        });

        it('should LessonService contain search method', function () {
            expect(angular.isFunction(_LessonService.search)).toBe(true);
        });

        it('should LessonService contain getPage method', function () {
            expect(angular.isFunction(_LessonService.getPage)).toBe(true);
        });

        it('should LessonService contain getDistinctValues method', function () {
            expect(angular.isFunction(_LessonService.getDistinctValues)).toBe(true);
        });

        it('should LessonService contain getComments method', function () {
            expect(angular.isFunction(_LessonService.getComments)).toBe(true);
        });

        it('should LessonService contain saveComment method', function () {
            expect(angular.isFunction(_LessonService.saveComment)).toBe(true);
        });

        it('should LessonService contain editComment method', function () {
            expect(angular.isFunction(_LessonService.editComment)).toBe(true);
        });

        it('should LessonService contain deleteComment method', function () {
            expect(angular.isFunction(_LessonService.deleteComment)).toBe(true);
        });

        it('should LessonService contain setCommentPrivates method', function () {
            expect(angular.isFunction(_LessonService.setCommentPrivates)).toBe(true);
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
                    var returnedPromise = _LessonService.search({});
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined();
            })

            it('Should LessonService.search() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
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

            it('Should LessonService.getPage() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.getPage(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).toBeDefined();
                expect(invalidParamEx.code).toBeDefined();
                expect(invalidParamEx.code).toEqual(20002);
            })

            it('Should LessonService.getPage() accept Object with pageNum parameter', function () {
                var invalidParamEx;
                var inputParams = {
                    pageNum: 2
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.getPage(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined;
            })

            it('Should LessonService.getDistinctValues() accept type=discipline|school|classroom|tag and inputParams (Object)', function () {
                var invalidParamEx;
                var inputParams = {}

                var invalidParamEx;

                //make the call.
                try {
                    _LessonService.getDistinctValues('discipline', inputParams);
                    _LessonService.getDistinctValues('school', inputParams);
                    _LessonService.getDistinctValues('classroom', inputParams);
                    _LessonService.getDistinctValues('tag', inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined;
            })

            it('Should LessonService.getComments() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.getComments(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).toBeDefined();
                expect(invalidParamEx.code).toBeDefined();
                expect(invalidParamEx.code).toEqual(20002);
            })

            it('Should LessonService.getComments() accept Object with id parameter', function () {
                var invalidParamEx;
                var inputParams = {
                    id: 1
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.getComments(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined();
            })

            it('Should LessonService.saveComment() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.saveComment(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).toBeDefined();
                expect(invalidParamEx.code).toBeDefined();
                expect(invalidParamEx.code).toEqual(20002);
            })

            it('Should LessonService.saveComment() accept CommentDTO Object', function () {
                var invalidParamEx;
                var inputParams = new _CommentDTO();

                var invalidParamEx;
                //make the call.
                try {
                    var returnedPromise = _LessonService.saveComment(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined();
            })

            it('Should LessonService.editComment() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.editComment(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).toBeDefined();
                expect(invalidParamEx.code).toBeDefined();
                expect(invalidParamEx.code).toEqual(20002);
            })

            it('Should LessonService.editComment() accept CommentDTO Object', function () {
                var invalidParamEx;
                var inputParams = new _CommentDTO();

                var invalidParamEx;
                //make the call.
                try {
                    var returnedPromise = _LessonService.editComment(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined();
            })

            it('Should LessonService.deleteComment() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.deleteComment(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).toBeDefined();
                expect(invalidParamEx.code).toBeDefined();
                expect(invalidParamEx.code).toEqual(20002);
            })

            it('Should LessonService.deleteComment() accept CommentDTO Object', function () {
                var invalidParamEx;
                var inputParams = new _CommentDTO();

                var invalidParamEx;
                //make the call.
                try {
                    var returnedPromise = _LessonService.deleteComment(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined();
            })

            it('Should LessonService.setCommentPrivates() not accept Object with uncorrect parameters, and throws exception', function () {
                var invalidParamEx;
                var inputParams = {
                    color: 'blue'
                }

                var invalidParamEx;

                //make the call.
                try {
                    var returnedPromise = _LessonService.setCommentPrivates(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).toBeDefined();
                expect(invalidParamEx.code).toBeDefined();
                expect(invalidParamEx.code).toEqual(20002);
            })

            it('Should LessonService.setCommentPrivates() accept CommentDTO Object', function () {
                var invalidParamEx;
                var inputParams = new _CommentDTO();

                var invalidParamEx;
                //make the call.
                try {
                    var returnedPromise = _LessonService.setCommentPrivates(inputParams);
                }
                catch (ex) {
                    invalidParamEx = ex;
                }
                expect(invalidParamEx).not.toBeDefined();
            })

        })

        // I want the real service to read from DB, so it has to be async service
        // So in Angular.js it should return a promise 
        it('should LessonService.search return a promise', function () {
            var promise = _LessonService.search({});
            expect(angular.isFunction(promise.then)).toBe(true);
            expect(angular.isFunction(promise.catch)).toBe(true);
            expect(angular.isFunction(promise.finally)).toBe(true);
        });

        it('should LessonService.getDistinctValues return a promise', function () {
            var promise = _LessonService.getDistinctValues('discipline', {});
            expect(angular.isFunction(promise.then)).toBe(true);
            expect(angular.isFunction(promise.catch)).toBe(true);
            expect(angular.isFunction(promise.finally)).toBe(true);
        });

        it('should LessonService.getComments return a promise', function () {
            var promise = _LessonService.getComments({id:1});
            expect(angular.isFunction(promise.then)).toBe(true);
            expect(angular.isFunction(promise.catch)).toBe(true);
            expect(angular.isFunction(promise.finally)).toBe(true);
        });

        it('should LessonService.saveComment return a promise', function () {
            var promise = _LessonService.saveComment(new _CommentDTO());
            expect(angular.isFunction(promise.then)).toBe(true);
            expect(angular.isFunction(promise.catch)).toBe(true);
            expect(angular.isFunction(promise.finally)).toBe(true);
        });

        it('should LessonService.editComment return a promise', function () {
            var promise = _LessonService.editComment(new _CommentDTO());
            expect(angular.isFunction(promise.then)).toBe(true);
            expect(angular.isFunction(promise.catch)).toBe(true);
            expect(angular.isFunction(promise.finally)).toBe(true);
        });

        it('should LessonService.deleteComment return a promise', function () {
            var promise = _LessonService.deleteComment(new _CommentDTO());
            expect(angular.isFunction(promise.then)).toBe(true);
            expect(angular.isFunction(promise.catch)).toBe(true);
            expect(angular.isFunction(promise.finally)).toBe(true);
        });

        it('should NOT LessonService.setCommentPrivates return a promise', function () {
            var promise = _LessonService.setCommentPrivates(new _CommentDTO());
            expect(angular.isFunction(promise.then)).toBe(false);
            expect(angular.isFunction(promise.catch)).toBe(false);
            expect(angular.isFunction(promise.finally)).toBe(false);
        });


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
        _defQueryString,
        _CommentDTO;

    // Befaore each test in the suite I inject the modules needed
    beforeEach(function () {
        //load the module.
      module('Lesson');

      //get your service, also get $httpBackend
      //$httpBackend will be a mock, thanks to angular-mocks.js
      inject(function (MockedData, $httpBackend, LessonService, DisciturSettings, CommentDTO) {
        _MockedData = MockedData;
        _httpBackend = $httpBackend;      
        _LessonService = LessonService;
        _DisciturSettings = DisciturSettings;
        _CommentDTO = CommentDTO;
      });

      _defQueryString = '?orderBy=PublishDate&orderDir=DESC&pageSize=3&startRow=0';
    })
    
    //make sure no expectations were missed in your tests.
    //(e.g. expectGET or expectPOST...)
    afterEach(function() {
      _httpBackend.verifyNoOutstandingExpectation();
      _httpBackend.verifyNoOutstandingRequest();
    });
 
    //-------- TEST CASES:
    it('Should the LessonService.search({}) pass default parameters of orderBy=PublishDate&orderDir=DESC&pageSize=3&startRow=0', function () {
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

    it('Should the LessonService.search({}) return a Paged Lesson', function () {
        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.startRow, 'proprieta\' startRow').toBeDefined();
                expect(data.count, 'proprieta\' count').toBeDefined();
                expect(data.pageSize, 'proprieta\' pageSize').toBeDefined();
                expect(data.lessons, 'proprieta\' lessons').toBeDefined();
            },
            errorCB: function () { }
        };

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
    });

    it('Should the LessonService.search({}) return the correct lesson count for all the lessons', function () {
      //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.count).toBe(6);
            },
            errorCB: function () { }
        };

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
    });

    it('Should the LessonService.search({}) return the first page of lessons', function () {
        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.startRow).toBe(0);
                expect(data.pageSize).toBe(_MockedData.lessons.PageSize);
            },
            errorCB: function () { }
        };

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

    it('Should the LessonService.getPage({pageNum:2}) return object with startRow=PageSize', function () {
        //make the call.
        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + _defQueryString).respond(_MockedData.lessons)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.search({});

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        var returned = _LessonService.getPage({ pageNum: 2 });
        expect(returned.constructor).toEqual(Object);
        expect(returned.startRow).toEqual(_MockedData.lessons.PageSize);
    });

    it('Should the LessonService.search(LessonService.getPage({pageNum:2})) change query parameter startRow=PageSize to the previous URL', function () {
        var secondPageNum = 2
        var newStartRow = (secondPageNum - 1) * _MockedData.lessons.PageSize;

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.startRow).toBe(newStartRow);
            },
            errorCB: function () { }
        };

        //make the call.
        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + _defQueryString).respond(_MockedData.lessons)

        //make the first call.
        var returnedPromise = _LessonService.search({});

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?orderBy=PublishDate&orderDir=DESC&pageSize=3&startRow=' + (newStartRow)).respond(_MockedData.secondPage)

        //make the second call for the second page.
        var returnedPromise = _LessonService.search(_LessonService.getPage({ pageNum: 2 }));

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.getDistinctValues(\'discipline\',{disciplineQ:it}) pass default parameters of ?disciplineQ=it', function () {
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
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?disciplineQ=it').respond(_MockedData.disciplines)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('discipline', { disciplineQ: 'it' });

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

    it('Should the LessonService.getDistinctValues(\'school\',{schoolQ:it}) pass default parameters of ?schoolQ=it', function () {
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
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?schoolQ=it').respond(_MockedData.schools)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('school', { schoolQ: 'it' });

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

    it('Should the LessonService.getDistinctValues(\'classroom\',{classroomQ:it}) pass default parameters of ?classroomQ=it', function () {
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
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?classroomQ=it').respond(_MockedData.classrooms)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('classroom', { classroomQ: 'it' });

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

    it('Should the LessonService.getDistinctValues(\'tag\',{tagQ:it}) pass default parameters of ?tagQ=it', function () {
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
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?tagQ=it').respond(_MockedData.tags)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('tag', { tagQ: 'it' });

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

    it('Should the LessonService.getDistinctValues(\'discipline\',{disciplineQ:it}) return array of strings', function () {
        //create an object with a function to spy on.
        var _test = {
            successCB: function (data) {
                //check your spy to see if it's been called with the returned value.  
                //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
                expect(data.constructor).toBe(Array);
                expect(data[0].constructor).toBe(String);
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?disciplineQ=it').respond(_MockedData.disciplines)

        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('discipline', { disciplineQ: 'it' });

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.getDistinctValues(\'school\',{schoolQ:it}) return array of strings', function () {
        //create an object with a function to spy on.
        var _test = {
            successCB: function (data) {
                //check your spy to see if it's been called with the returned value.  
                //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
                expect(data.constructor).toBe(Array);
                expect(data[0].constructor).toBe(String);
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?schoolQ=it').respond(_MockedData.schools)

        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('school', { schoolQ: 'it' });

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.getDistinctValues(\'classroom\',{classroomQ:it}) return array of strings', function () {
        //create an object with a function to spy on.
        var _test = {
            successCB: function (data) {
                //check your spy to see if it's been called with the returned value.  
                //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
                expect(data.constructor).toBe(Array);
                expect(data[0].constructor).toBe(String);
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?classroomQ=it').respond(_MockedData.classrooms)

        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('classroom', { classroomQ: 'it' });

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.getDistinctValues(\'tag\',{tagQ:it}) return array of strings', function () {
        //create an object with a function to spy on.
        var _test = {
            successCB: function (data) {
                //check your spy to see if it's been called with the returned value.  
                //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
                expect(data.constructor).toBe(Array);
                expect(data[0].constructor).toBe(String);
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_DisciturSettings.apiUrl + 'lesson' + '?tagQ=it').respond(_MockedData.tags)

        //make the call.
        var returnedPromise = _LessonService.getDistinctValues('tag', { tagQ: 'it' });

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.getComments({id:1}) call api\\lesson\\1\\comments URL', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/1/comments'

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
        _httpBackend.expectGET(_defURLComments).respond(_MockedData.comments)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.getComments({id:1});

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

    it('Should the LessonService.getComments({id:1}) return a User CommentDTO array', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/1/comments'
        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === Array).toBe(true);
                expect(data.length).toBe(6);
                expect(data[0].id, 'proprieta\' id').toBeDefined();
                expect(data[0].lessonId, 'proprieta\' lessonId').toBeDefined();
                //expect(data[0].pageSize, 'proprieta\' pageSize').toBeDefined();
                //expect(data[0].lessons, 'proprieta\' lessons').toBeDefined();
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectGET(_defURLComments).respond(_MockedData.comments)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var returnedPromise = _LessonService.getComments({ id: 1 });

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB);

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.saveComment(CommentsDTO.lessonId=555) call api\\lesson\\555\\comment URL in POST', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment'

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
        _httpBackend.expectPOST(_defURLComments).respond(_MockedData.savedCommentl0)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        var returnedPromise = _LessonService.saveComment(_input);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB,_test.errorCB);

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        //check your spy to see if it's been called with the returned value.  
        //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
        expect(_test.successCB).toHaveBeenCalled();
        expect(_test.errorCB).not.toHaveBeenCalled();
    });

    it('Should the LessonService.saveComment(CommentsDTO.lessonId=555) return a User CommentDTO attached to lessonId=555', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment'

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === _CommentDTO).toBe(true);
                expect(data.lessonId === 555, 'proprieta\' lessonId=555').toBe(true);
                //expect(data[0].pageSize, 'proprieta\' pageSize').toBeDefined();
                //expect(data[0].lessons, 'proprieta\' lessons').toBeDefined();
            },
            errorCB: function () { }
        };



        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectPOST(_defURLComments).respond(_MockedData.savedCommentl0)

        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        var returnedPromise = _LessonService.saveComment(_input);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        //check your spy to see if it's been called with the returned value.  
        //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
        //expect(_test.successCB).toHaveBeenCalled();
        //expect(_test.errorCB).not.toHaveBeenCalled();
    });

    it('Should the LessonService.saveComment(CommentsDTO.lessonId=555, []) return a User CommentDTO attached to lessonId=555 with _num=1 and _order=0.001', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment'

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === _CommentDTO).toBe(true);
                expect(data.lessonId === 555, 'proprieta\' lessonId=555').toBe(true);
                expect(data._num, 'proprieta\' _num').toBe(1);
                expect(data._order, 'proprieta\' _order').toBe('0.001');
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectPOST(_defURLComments).respond(_MockedData.savedCommentl0)

        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        var returnedPromise = _LessonService.saveComment(_input,[]);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.saveComment(CommentsDTO, [with 2 elements]) return a User CommentDTO with _num=3 and _order=0.003', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment'

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === _CommentDTO).toBe(true);
                expect(data._num, 'proprieta\' _num').toBe(3);
                expect(data._order, 'proprieta\' _order').toBe('0.003');
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectPOST(_defURLComments).respond(_MockedData.savedCommentl0)

        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        _input.level = 0
        _input.parentId = null;
        var returnedPromise = _LessonService.saveComment(_input, [{ id: 1 }, {id:2}]);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.saveComment(CommentsDTO.parentId=1, [with 2 eleemtns, and with element.id=1, element._order=0.002]) return a User CommentDTO with _num=3 and _order=0.002003', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment'

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === _CommentDTO).toBe(true);
                expect(data._num, 'proprieta\' _num').toBe(3);
                expect(data._order, 'proprieta\' _order').toBe('0.002003');
            },
            errorCB: function () { }
        };

        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectPOST(_defURLComments).respond(_MockedData.savedCommentl1)

        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        _input.level = 1
        _input.parentId = 1;
        debugger
        var returnedPromise = _LessonService.saveComment(_input, [{ id: 1, level: 0, _order: '0.002', _num: 2 }, { id: 2 }]);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();
    });

    it('Should the LessonService.editComment(CommentsDTO{lessonId:555, id:999}) call api\\lesson\\555\\comment\\999 URL in PUT', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment/999'

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
        _httpBackend.expectPUT(_defURLComments).respond(_MockedData.savedCommentl0)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        _input.id = 999;
        var returnedPromise = _LessonService.editComment(_input);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        //check your spy to see if it's been called with the returned value.  
        //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
        expect(_test.successCB).toHaveBeenCalled();
        expect(_test.errorCB).not.toHaveBeenCalled();
    });

    it('Should the LessonService.editComment(CommentsDTO{lessonId:555, id:999}) return a User CommentDTO with same id', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment/999'

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === _CommentDTO).toBe(true);
                expect(data.id, 'proprieta\' id').toBe(_input.id);
                expect(data.lessonId, 'proprieta\' lessonId').toBe(_input.lessonId);
            },
            errorCB: function () { }
        };



        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectPUT(_defURLComments).respond(_MockedData.savedCommentl0)

        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        _input.id = 999;
        var returnedPromise = _LessonService.editComment(_input);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //flush the backend to "execute" the request.
        _httpBackend.flush();
    });

    it('Should the LessonService.deleteComment(CommentsDTO{lessonId:555, id:999}) call api\\lesson\\555\\comment\\999\\delete URL in PUT', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment/999/delete'

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
        _httpBackend.expectPUT(_defURLComments).respond(_MockedData.savedCommentl0)

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [START] -------------------------
        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        _input.id = 999;
        var returnedPromise = _LessonService.deleteComment(_input);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //--------------------- TEST CODE TO DRIVE THE DEVELOPMENT [END] ---------------------------

        //flush the backend to "execute" the request to do the expectedGET assertion.
        _httpBackend.flush();

        //check your spy to see if it's been called with the returned value.  
        //expect(_test.successCB).toHaveBeenCalledWith(_MockedData.lessons);
        expect(_test.successCB).toHaveBeenCalled();
        expect(_test.errorCB).not.toHaveBeenCalled();
    });

    it('Should the LessonService.deleteComment(CommentsDTO{lessonId:555, id:999}) return a User CommentDTO with same id', function () {
        var _defURLComments = _DisciturSettings.apiUrl + 'lesson/555/comment/999/delete'

        //create an object with a function to spy on.
        // DO NOT USE Spy (It prevents to callback in promise chain)
        var _test = {
            successCB: function (data) {
                expect(data.constructor === _CommentDTO).toBe(true);
                expect(data.id, 'proprieta\' id').toBe(_input.id);
                expect(data.lessonId, 'proprieta\' lessonId').toBe(_input.lessonId);
            },
            errorCB: function () { }
        };



        // Create mocked api route.
        // I want to emulate what I will do in real app code, so I use the same config as in the real code
        _httpBackend.expectPUT(_defURLComments).respond(_MockedData.savedCommentl0)

        //make the call.
        var _input = new _CommentDTO();
        _input.lessonId = 555;
        _input.id = 999;
        var returnedPromise = _LessonService.deleteComment(_input);

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(_test.successCB, _test.errorCB);

        //flush the backend to "execute" the request.
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
            expect(_scope.lessons).toEqual(_lessonNewsData.lessons)

        });
        

    })

    describe('- LessonAdvSearchCtrl - ', function () {

        beforeEach(function () {
            _$modalInstance = {}
        })

        it("Should Exists LessonAdvSearchCtrl controller", function () {
            var _ctrl = _$controller('LessonAdvSearchCtrl', { $scope: _scope, $modalInstance: _$modalInstance, LabelService: _LabelService, LessonService : _LessonService, $state: _$state });
            expect(_ctrl).toBeDefined();
        });


    })

    describe('- LessonSearchCtrl -', function () {

        var _LabelService,
            _$state,
            _$modal,
            _modalInstance;

        beforeEach(function () {
            _LabelService = { 
                get: function () { } 
            }
            _$state = { 
                is: function () { }, 
                go: function () { }
            }

            // fake modalInstance
            _modalInstance = {
                result: {
                    then: function (successCB, errorCB) {
                        successCB()
                    }
                }
            }
            // fake $modal
            _$modal = {                
                open: function () {
                    return _modalInstance;
                }

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

        it('Should exists method openAdvSearch in scope', function () {
            var _ctrl = _$controller('LessonSearchCtrl', { $scope: _scope, LabelService: _LabelService, $state: _$state, $modal: _$modal });
            expect(angular.isFunction(_scope.openAdvSearch)).toBe(true);
        })

        it('Should exists method openAdvSearch in scope', function () {
            var _ctrl = _$controller('LessonSearchCtrl', { $scope: _scope, LabelService: _LabelService, $state: _$state, $modal: _$modal });
            expect(angular.isFunction(_scope.openAdvSearch)).toBe(true);
        })

        //TODO: deep into unit test of $modal...

        //unit test to remove after refactoring...
        // Removed search method always call $state managent (ui-router)

    })
    
})

describe("Unit - module:User - Testing Services", function () {
    var _AuthService;

    //excuted before each "it" is run.
    beforeEach(function () {

        //load the module.
        module('disc.user');

        //inject your service for testing.
        inject(function (AuthService) {
            _AuthService = AuthService;
        });
    });

    it('should contain a AuthService service', function () {
        expect(_AuthService).not.toBe(null);
    });

    it('should AuthService contain login method', function () {
        expect(angular.isFunction(_AuthService.login)).toBe(true);
    });

    it('should AuthService contain logout method', function () {
        expect(angular.isFunction(_AuthService.logout)).toBe(true);
    });

    it('should AuthService contain getUserInfo method', function () {
        expect(angular.isFunction(_AuthService.getUserInfo)).toBe(true);
    });

    it('Should AuthService.login() accept Object instance', function () {
        var invalidParamEx;

        //make the call.
        try {
            var returnedPromise = _AuthService.login({});
        }
        catch (ex) {
            invalidParamEx = ex;
        }
        expect(invalidParamEx).not.toBeDefined();
    })


});