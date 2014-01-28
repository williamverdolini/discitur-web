angular.module('Lesson')
    /*-------------------------------------------------------------------------------
    Vantaggi del DTO:
    - disaccoppiamento tra i dati restituite dal BE e quelli gestiti dal FE
    - presenza di un (Client) Object Model distinto dal (Server( Object e/o Entity Model
    - possibilità di verificare il reale contenuto delle classi a codice (non a runtime)

    riferimenti: http://www.bennadel.com/blog/2527-Defining-Instantiatable-Classes-In-The-AngularJS-Dependency-Injection-Framework.htm
    ---------------------------------------------------------------------------------*/
    .factory('LessonDTO', function () {
        function LessonDTO() {
            this.lessonId = null;
            this.title = null;
            this.discipline = null;
            this.school = null;
            this.classroom = null;
            this.rate = null;
            this.author = null;
            this.publishedOn = null;
            this.goods = [];
            this.bads = [];
            this.tags = [];
            this.content = null;
            this.conclusion = null;
        }
        return (LessonDTO);
    })
    .factory('LessonService', [
        '$resource',
        '$http',
        '$q',
        'LessonDTO',
        'DisciturSettings',
        'DiscUtil',
        function ($resource, $http, $q, LessonDTO, DisciturSettings, DiscUtil) {
            //-------- private methods -------
            // Private methods for DTO purposes
            // Lesson Data Transfer
            var _dataTransfer = function (lessonData) {
                var lesson = new LessonDTO();
                lesson.lessondId = lessonData.LessonId;
                lesson.title = lessonData.Title;
                lesson.discipline = lessonData.Discipline;
                lesson.school = lessonData.School;
                lesson.classroom = lessonData.Classroom;
                lesson.author = {
                    name: lessonData.Author.Name,
                    surname: lessonData.Author.Surname
                }
                lesson.publishedOn = lessonData.PublishDate;
                lesson.rate = lessonData.Rate;
                angular.forEach(lessonData.FeedBacks, function (feedBack, key) {
                    if (feedBack.Nature == 1) this.goods.push(feedBack.Feedback)
                    if (feedBack.Nature == 2) this.bads.push(feedBack.Feedback)
                    }, lesson);
                angular.forEach(lessonData.Tags, function (tag, key) {
                    this.tags.push(tag.LessonTagName)
                    }, lesson);
                lesson.content = lessonData.Content;
                lesson.conclusion = lessonData.Conclusion;
                return lesson;
            }
            // Lesson Array Data Transfer
            var _arrayDataTransfer = function (resultArray) {
                var lessons = [];
                for (var i = 0; i < resultArray.length; i++) {
                    lessons.push(_dataTransfer(resultArray[i]));
                }
                return lessons;
            }
            // Paged Lesson Array Data Transfer
            var _pageDataTransfer = function (resultPage) {
                var page = {
                    startRow : resultPage.StartRow,
                    count: resultPage.Count,
                    pageSize: resultPage.PageSize,
                    lessons: _arrayDataTransfer(resultPage.Records)
                }
                return page;
            }
            //-------- private properties -------
            var _currentInput;
            var _currentPage;

            //-------- public methods-------
            return {
                // Retrieve Async data for lesson id in input 
                // and return a LessonDTO instance
                get: function (inputParams) {
                    DiscUtil.validateInput(
                        'LessonService.get',   // function name for logging purposes
                        { id: null},              // hashmap to check inputParameters
                        inputParams            // actual input params
                    );
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data for lesson id in input        
                    //$http.get('../api/lesson/' + inputParams.id)
                    $http.get(DisciturSettings.apiUrl + 'lesson/' + inputParams.id)
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                deferred.resolve(_dataTransfer(result));
                            })
                        .error(
                            // Error Callback
                            function () {
                                deferred.reject("no Lesson for id:" + inputParams.id);
                            });

                    return deferred.promise;
                },
                // Search Async data for lesson inputParams
                // and return a and array of LessonDTO instances
                search: function (inputParams) {
                    DiscUtil.validateInput(
                        'LessonService.search',       // function name for logging purposes
                        {                             // hashmap to check inputParameters e set default values
                            keyword: null,
                            inContent: null,
                            discipline: null,
                            school: null,
                            classroom: null,
                            rate: null,
                            tags: null,
                            startRow: 0,
                            pageSize: 3,
                            orderBy: "PublishDate",
                            orderDir: "DESC"
                        }, 
                        inputParams                   // actual input params
                        );
                    // create deferring result
                    var deferred = $q.defer();
                    
                    // Retrieve Async data for lesson id in input        
                    $http({ method: 'GET', url: DisciturSettings.apiUrl + 'lesson', params: inputParams })
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                // save search input e result Data for future paging
                                _currentInput = inputParams;
                                _currentPage = _pageDataTransfer(result)
                                deferred.resolve(_currentPage)
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error for search:" + data);
                            });
                    // create deferring result
                    return deferred.promise;
                },
                // Get Async page of lesson based on pageinput
                // and return a and array of LessonDTO instances
                getPage: function (pageinput) {
                    DiscUtil.validateInput(
                        'LessonService.getPage',    // function name for logging purposes
                        {                           // hashmap to check inputParameters e set default values
                            pageNum: null
                        },
                        pageinput                   // actual input params
                        );

                    _currentInput.startRow = (pageinput.pageNum - 1) * _currentInput.pageSize
                    return _currentInput;
                    //return this.search(_currentInput)
                },
                // Get Async list of disciplines
                getDistinctValues: function (type, inputParams) {
                    switch (type) {
                        case('discipline') :
                            DiscUtil.validateInput('LessonService.getDistinctValues.discipline', { disciplineQ: null }, inputParams);
                            break;
                        case ('school'):
                            DiscUtil.validateInput('LessonService.getDistinctValues.school', { schoolQ: null }, inputParams);
                            break;
                        case ('classroom'):
                            DiscUtil.validateInput('LessonService.getDistinctValues.classroom', { classroomQ: null }, inputParams);
                            break;
                        case ('tag'):
                            DiscUtil.validateInput('LessonService.getDistinctValues.tag', { tagQ: null }, inputParams);
                            break;
                        default:
                            throw { code: 20003, message: 'invalid type string for LessonService.getDistinctValues :' + type }
                    }

                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data for lesson id in input        
                    $http({ method: 'GET', url: DisciturSettings.apiUrl + 'lesson', params: inputParams })
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                deferred.resolve(result)
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error for LessonService.getDistinctValues:" + data);
                            });
                    // create deferring result
                    return deferred.promise;

                }
            };
      }]);