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
    .factory('CommentDTO', function () {
        function CommentDTO() {
            this.lessonId = null;
            this.id = null;
            this.content = null;
            this.date = null;
            this.parentId = null;
            this.level = 0;
            this.author = {
                userid: null,
                username: null,
                image: null
            };
            this.order = 0.0;
        }
        return (CommentDTO);
    })
    .factory('LessonService', [
        '$resource',
        '$http',
        '$q',
        'LessonDTO',
        'CommentDTO',
        'DisciturSettings',
        'DiscUtil',
        function ($resource, $http, $q, LessonDTO, CommentDTO, DisciturSettings, DiscUtil) {
            //-------- private methods -------
            // Private methods for DTO purposes

            // Lesson Data Transfer
            var _dataTransfer = function (lessonData) {
                var lesson = new LessonDTO();
                lesson.lessonId = lessonData.LessonId;
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
            // Lesson Comment data Transfer
            var _commentTransfer = function (commentData) {
                var comment = new CommentDTO();
                comment.lessonId = commentData.LessonId;
                comment.id = commentData.Id;
                comment.content = commentData.Content;
                comment.date = commentData.Date;
                comment.parentId = commentData.ParentId || 0;
                comment.level = commentData.Level
                comment.author.userid = commentData.Author.UserId;
                comment.author.username = commentData.Author.UserName;
                comment.author.image = commentData.Author.Picture;
                return comment;
            }
            // Lesson Comments array data Transfer
            // The method transfer Comment ApiData and set client Comment poperties (usefuk for sorting):
            // _num: progress number of lesson comment
            // _order: string for lesson comment sorting
            var _commentsArrayTransfer = function (commentArrayData) {
                var comments = [];
                for (var i = 0; i < commentArrayData.length; i++) {
                    comments.push(_commentTransfer(commentArrayData[i]));
                }
                if (comments.length > 0) {
                    comments.sort(function (c1,c2) { return c1.id - c2.id })
                }
                for (var i = 0; i < comments.length; i++) {
                    comments[i]._num = i+1;
                    comments[i]._order = _getCommentOrderString(comments[i], comments);
                }
                return comments;
            }
            // utility method to left padding with "0"
            var lpad = function padDigits(number, digits) {
                return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
            }
            // get client property value _order: the method define the Lesson Comment sorting algorith 
            var _getCommentOrderString = function (comment, commentsArray) {
                var order = "";
                if (comment.level > 0) {
                    for (var i = 0; i < commentsArray.length; i++) {
                        if (comment.parentId == commentsArray[i].id) {
                            order += _getCommentOrderString(commentsArray[i], commentsArray);
                            order += lpad(comment._num, 3);
                        }
                    }
                }
                if (comment.level == 0) {
                    order = "0." + lpad(comment._num, 3) + order;
                }
                return order;
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

                },
                // Get Async list of lesson's users comments
                getComments: function (inputParams) {
                    DiscUtil.validateInput(
                        'LessonService.getComments',       // function name for logging purposes
                        {                             // hashmap to check inputParameters e set default values
                            id: null
                        },
                        inputParams                   // actual input params
                        );
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data for lesson id in input        
                    $http({ method: 'GET', url: DisciturSettings.apiUrl + 'lesson/' + inputParams.id + '/comments' })
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                deferred.resolve(_commentsArrayTransfer(result))
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error for getting comments on lesson id:'+ inputParams.id + ' -> " + data);
                            });
                    // create deferring result
                    return deferred.promise;
                },
                // Save Async User Comment
                saveComment: function (comment, commentsArray) {
                    DiscUtil.validateInput(
                        'LessonService.saveComment',       // function name for logging purposes
                        new CommentDTO(),                  // hashmap to check inputParameters e set default values
                        comment                            // actual input params
                        );
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data for lesson id in input        
                    $http({ method: 'POST', url: DisciturSettings.apiUrl + 'lesson/' + comment.lessonId + '/comment', data: comment })
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                var _newComment = _commentTransfer(result);
                                // if lesson comments array is passed, the new comment is enriched with client properties
                                if (commentsArray && commentsArray.constructor == Array) {
                                    _newComment._num = commentsArray.length + 1;
                                    _newComment._order = _getCommentOrderString(_newComment, commentsArray);
                                }
                                deferred.resolve(_newComment)
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error saving comment on lesson id:"+ comment.lessonId + " -> " + data);
                            });
                    // create deferring result
                    return deferred.promise;
                },
                // Save Async User Comment
                editComment: function (comment) {
                    DiscUtil.validateInput(
                        'LessonService.editComment',       // function name for logging purposes
                        new CommentDTO(),                  // hashmap to check inputParameters e set default values
                        comment                            // actual input params
                        );
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data for lesson id in input        
                    $http({ method: 'PUT', url: DisciturSettings.apiUrl + 'lesson/' + comment.lessonId + '/comment/' + comment.id, data: comment })
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result, status) {
                                // I don't understand this...I should go on error callback...
                                if (status >= 200 && status < 300) {
                                    var _newComment = _commentTransfer(result);
                                    _newComment._num = comment._num;
                                    _newComment._order = comment._order;
                                    deferred.resolve(_newComment)
                                }
                                else
                                    deferred.reject("Error editing comment on lesson id:" + comment.lessonId + " -> " + result);
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error editing comment on lesson id:" + comment.lessonId + " -> " + data);
                            });
                    // create deferring result
                    return deferred.promise;
                },
                // Delete Async User Comment
                deleteComment: function (comment) {
                    DiscUtil.validateInput(
                        'LessonService.deleteComment',  // function name for logging purposes
                        new CommentDTO(),               // hashmap to check inputParameters e set default values
                        comment                         // actual input params
                        );
                    // create deferring result
                    var deferred = $q.defer();

                    // execute logical delete, updating record state (Api business logic)
                    $http({ method: 'PUT', url: DisciturSettings.apiUrl + 'lesson/' + comment.lessonId + '/comment/' + comment.id + '/delete', data: comment })
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result, status) {
                                // I don't understand this...I should go on error callback...
                                if (status >= 200 && status < 300) {
                                    deferred.resolve(comment);
                                }
                                else
                                    deferred.reject("Error deleting comment on lesson id:" + comment.lessonId + " -> " + arguments.toString());
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error deleting comment on lesson id:" + comment.lessonId + " -> " + data);
                            });
                    // create deferring result
                    return deferred.promise;
                },
                // add local Comment properties, for comments sorting purposes
                setCommentPrivates: function (comment, commentsArray) {
                    DiscUtil.validateInput(
                        'LessonService.setCommentPrivates',  // function name for logging purposes
                        new CommentDTO(),                    // hashmap to check inputParameters e set default values
                        comment                              // actual input params
                        );
                    if (commentsArray && commentsArray.constructor == Array) {
                        comment._num = commentsArray.length + 1;
                        comment._order = _getCommentOrderString(comment, commentsArray);
                    }
                    return comment;
                }
            };
      }]);