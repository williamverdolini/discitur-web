angular.module('Lesson')
    .controller('LessonCtrl', [
        '$scope',
        'LabelService',
        'LessonService',
        '$sce',
        'lessonData',
        '$rootScope',
        'AuthService',
        'CommentDTO',
        function (
            $scope,
            LabelService,
            LessonService,
            $sce,
            lessonData,
            $rootScope,
            AuthService,
            CommentDTO
            ) {
            //-------- private methods-------
            var _getLabel = function (label) {
                return LabelService.get('LessonCtrl', label);
            }
            //-------- public properties-------
            $scope.labels = {
                specifics: _getLabel('specifics'),
                discipline: _getLabel('discipline'),
                school: _getLabel('school'),
                classroom: _getLabel('classroom'),
                author: _getLabel('author'),
                publishedOn: _getLabel('publishedOn'),
                rating: _getLabel('rating'),
                content: _getLabel('content'),
                lessonGoods: _getLabel('lessonGoods'),
                noLessonGoods: _getLabel('noLessonGoods'),
                lessonBads: _getLabel('lessonBads'),
                noLessonBads: _getLabel('noLessonBads'),
                conclusion: _getLabel('conclusion'),
                comments: _getLabel('comments'),
                ratings: _getLabel('ratings'),
                ratingtHelp: _getLabel('ratingtHelp')
            };

            $scope.local = {
                commentText: null,
                commentError : null,
                commentTexts: [],
                commentErrors: [],
                user: {
                    isLogged: false,
                    userId: false
                }
            }

            //-------- public methods -------
            $scope.actions = {
                openSignIn: function () {
                    $rootScope.$broadcast('disc.login', $scope.actions)
                },
                ok: function () {
                    //$scope.local.commentText = 'Inserisci il tuo commento'
                    //$scope.local.UserCommentForm.CommentTXT.focus();
                },
                // save User Comment
                saveComment: function (comment) {
                    // retrieve current form
                    var localForm = comment ? $scope.local['UserCommentFormOn' + comment.id] : $scope.local.UserCommentForm;
                    var localTxtArea = localForm.CommentTXT;
                    // check for validation error
                    if (localTxtArea.$valid) {
                        var _comment = new CommentDTO();
                        _comment.lessonId = $scope.lesson.lessonId;
                        _comment.content = localTxtArea.$modelValue;
                        //_comment.date = new Date();
                        _comment.parentId = comment ? comment.id : null;
                        _comment.level = comment ? comment.level + 1 : 0;
                        _comment.author.userid = AuthService.user.userid;
                        LessonService.saveComment(_comment, $scope.lesson.comments)
                            .then(function (savedComment) {
                                $scope.lesson.comments.push(savedComment);
                                // Reset Aswer textarea
                                if (comment) {
                                    comment.anwser = false;
                                    $scope.local.commentTexts[comment.id] = "";
                                }
                                else {
                                    $scope.local.commentText = "";
                                }
                            })
                    }
                },
                // Add the new User Comment to Lesson's Comments array
                addComment: function (comment) {
                    $scope.lesson.comments.push(
                        LessonService.setCommentPrivates(comment, $scope.lesson.comments)
                        );
                },
                // Remove the User Comment from Lesson's Comments array
                deleteComment: function (comment) {
                    var index = -1;
                    for (var i = 0; i < $scope.lesson.comments.length; i++) {
                        if ($scope.lesson.comments[i].id === comment.id)
                            index = i;
                    }
                    if(index>-1)
                        $scope.lesson.comments.splice(index, 1);
                },
                // check for authentication and open/close user comment textarea
                openUserComment: function (comment) {
                    if (!$scope.isLogged) {
                        !$scope.actions.openSignIn();
                    }
                    comment.anwser = !comment.anwser;
                },
                // check if exists user's rating
                userHasVoted : function(){
                    for (var i = 0; i < $scope.lesson.ratings.length; i++) {
                        if ($scope.lesson.ratings[i].author.userid === AuthService.user.userid)
                            return true;
                    }
                    return false;
                },
                // Add the new User Rating to Lesson's Comments array
                addRating: function (rating) {
                    $scope.lesson.ratings.push(rating);
                },
                // Remove the User Comment from Lesson's Comments array
                deleteRating: function (rating) {
                    var index = -1;
                    for (var i = 0; i < $scope.lesson.ratings.length; i++) {
                        if ($scope.lesson.ratings[i].id === rating.id)
                            index = i;
                    }
                    if (index > -1)
                        $scope.lesson.ratings.splice(index, 1);
                }
            }

            //-------- Controller Initialization -------
            $scope.isLogged = AuthService.user.isLogged
            $scope.local.user.isLogged = AuthService.user.isLogged;
            $scope.local.user.userId = AuthService.user.userid;
            $scope.$watch(function () {
                return AuthService.user.isLogged;
            },
                function () {
                    $scope.isLogged = AuthService.user.isLogged;
                    $scope.local.user.isLogged = AuthService.user.isLogged;
                    $scope.local.user.userId = AuthService.user.userid;
                }
            );

            /***** model initialization ****/
            // lesson data async
            var currentLesson = lessonData;
            $scope.lesson = currentLesson;
            $scope.lesson.content = $sce.trustAsHtml(currentLesson.content);
            // Users Comments
            $scope.lesson.comments = [];
            LessonService.getComments({ id: $scope.lesson.lessonId })
                .then(function (comments) { $scope.lesson.comments = comments; }) // success
            // Users Ratings
            $scope.lesson.ratings = [];
            LessonService.getRatings({ id: $scope.lesson.lessonId })
                .then(function (ratings) { $scope.lesson.ratings = ratings; }) // success

        }
    ]);
