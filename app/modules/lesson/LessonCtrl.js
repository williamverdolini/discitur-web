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
                commentTexts: []
            }

            $scope.actions = {
                openSignIn: function () {
                    $rootScope.$broadcast('disc.login', $scope.actions)
                },
                ok: function () {
                    //$scope.local.commentText = 'Inserisci il tuo commento'
                    //$scope.local.UserCommentForm.CommentTXT.focus();
                },
                saveComment: function (comment) {
                    var _comment = new CommentDTO();
                    _comment.lessonId = $scope.lesson.lessonId;
                    _comment.content = comment ? $scope.local.commentTexts[comment.id] : $scope.local.commentText;
                    //_comment.date = new Date();
                    _comment.parentId = comment ? comment.id : null;
                    _comment.level = comment ? comment.level + 1 : 0;
                    _comment.author.userid = AuthService.user.userid;

                    LessonService.saveComment(_comment)
                        .then(function (savedComment) {
                            $scope.lesson.comments.push(savedComment);
                            if (comment) {
                                comment.anwser = false;
                                $scope.local.commentTexts[comment.id] = "";
                            }
                        })
                },
                openUserComment: function (comment) {
                    if (!$scope.isLogged) {
                        !$scope.actions.openSignIn();
                    }
                    comment.anwser = true;
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
