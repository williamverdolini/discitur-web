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
            //------- label initialization -------//
            _getLabel = function (label) {
                return LabelService.get('LessonCtrl', label);
            }

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
                commentPlaceholder: _getLabel('commentPlaceholder'),
                commentHelp: _getLabel('commentHelp'),
                commentAnswer: _getLabel('commentAnswer'),
                commentSave: _getLabel('commentSave')
            };

            $scope.local = {
                commentText: null,
                commentError : null,
                commentTexts: [],
                commentErrors: []
            }

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
                addComment: function (comment) {
                    $scope.lesson.comments.push(
                        LessonService.setCommentPrivates(comment, $scope.lesson.comments)
                        );
                },
                // check for authentication and open/close user comment textarea
                openUserComment: function (comment) {
                    if (!$scope.isLogged) {
                        !$scope.actions.openSignIn();
                    }
                    comment.anwser = !comment.anwser;
                }
            }

            $scope.isLogged= AuthService.user.isLogged
            $scope.$watch(function () {
                return AuthService.user.isLogged;
            },
                function () {
                    $scope.isLogged = AuthService.user.isLogged;
                }
            );

            /***** model initialization ****/
            // lesson data async
            var currentLesson = lessonData;
            $scope.lesson = currentLesson;
            $scope.lesson.content = $sce.trustAsHtml(currentLesson.content);
            $scope.lesson.comments = [];
            LessonService.getComments({ id: $scope.lesson.lessonId })
                .then(function (comments) { $scope.lesson.comments = comments; }) // success

            
        }
    ]);
