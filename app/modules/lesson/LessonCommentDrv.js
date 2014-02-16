angular.module('Lesson')
    .directive('lessonComment', [
        '$rootScope',
        'LabelService',
        'LessonService',
        'AuthService',
        'CommentDTO',
        '$timeout',
        function ($rootScope, LabelService, LessonService, AuthService, CommentDTO, $timeout) {
            return {
                restrict: 'E',
                templateUrl: 'modules/lesson/LessonComment.html',
                replace: true,
                transclude: false,
                scope: {
                    comment: '=?',
                    lessonId: '@',
                    addComment: '&',
                    deleteComment: '&'
                },
                link: function (scope, element, attrs) {
                    //-------- private methods-------
                    // call Label Service to get dynamic labels
                    var _getLabel = function (label) {
                        return LabelService.get('LessonCtrl', label);
                    }

                    //-------- private variables-------
                    var form = element.find('form');

                    //-------- public properties-------
                    scope.local = {
                        commentText: null,
                        commentError: null,
                        UserCommentForm: form.controller('form'),
                        base: angular.isUndefined(scope.comment),
                        isLogged: AuthService.user.isLogged,
                        sameUser: scope.comment ? (scope.comment.author.username == AuthService.user.username) : false,
                        answer: false,
                        edit: false,
                        showDeleteCommentErr: false
                    }

                    scope.labels = {
                        comments: _getLabel('comments'),
                        commentPlaceholder: _getLabel('commentPlaceholder'),
                        commentHelp: _getLabel('commentHelp'),
                        commentAnswer: _getLabel('commentAnswer'),
                        commentEdit: _getLabel('commentEdit'),
                        commentPreview: _getLabel('commentPreview'),
                        commentSave: _getLabel('commentSave'),
                        commentRequired: _getLabel('commentRequired'),
                        commentNotDelete: _getLabel('commentNotDelete')
                    };

                    //-------- public methods-------
                    scope.actions = {
                        // call Sign Modal Dialog to login
                        openSignIn: function () {
                            $rootScope.$broadcast('disc.login', scope.actions)
                        },
                        // save User Comment
                        saveComment: function () {
                            // retrieve current form
                            var localForm = scope.local.UserCommentForm;
                            var localTxtArea = localForm.CommentTXT;
                            // check for validation error
                            if (localTxtArea.$valid) {
                                var _comment = new CommentDTO();
                                _comment.lessonId = scope.lessonId;
                                _comment.content = localTxtArea.$modelValue;
                                //_comment.date = new Date();
                                _comment.parentId = scope.comment ? scope.comment.id : null;
                                _comment.level = scope.comment ? scope.comment.level + 1 : 0;
                                _comment.author.userid = AuthService.user.userid;
                                LessonService.saveComment(_comment)
                                    .then(function (savedComment) {
                                        //  Parent controll method to add new comment into local lesson's comment array
                                        scope.addComment({ comment: savedComment });
                                        // Reset Aswer textarea
                                        if (!scope.local.base) {
                                            scope.local.answer = false;
                                        }
                                        scope.local.commentText = "";
                                        localForm.$setPristine();
                                    })
                            }
                        },
                        // Edit User Comment
                        editComment: function () {
                            // retrieve current form
                            var localForm = scope.local.UserEditCommentForm;
                            var localTxtArea = localForm.CommentTXT;
                            // check for validation error
                            if (localTxtArea.$valid) {
                                var _comment = new CommentDTO();
                                angular.extend(_comment, scope.comment);
                                _comment.content = localTxtArea.$modelValue

                                LessonService.editComment(_comment)
                                    .then(function (modifiedComment) {
                                        //  Parent controll method to add new comment into local lesson's comment array
                                        scope.comment = modifiedComment;
                                        scope.local.edit = false;
                                        localForm.$setPristine();
                                    })
                            }
                        },
                        // Delete User Comment
                        deleteComment: function () {
                            LessonService.deleteComment(scope.comment)
                                .then(
                                    function (deletedComment) {
                                        //  Parent controll method to add new comment into local lesson's comment array
                                        scope.deleteComment({ comment: deletedComment });
                                    },
                                    function (errorData) {
                                        scope.local.showDeleteCommentErr = true;
                                        $timeout(function () { scope.local.showDeleteCommentErr = false }, 5000);
                                    }
                                )
                        },
                        // check for authentication and open/close user comment textarea
                        openUserComment: function () {
                            if (!scope.local.isLogged) {
                                !scope.actions.openSignIn();
                            }
                            scope.local.answer = !scope.local.answer;
                        }
                    }

                    //-------- Initialization -------
                    // Watcher for authentication depending behaviours
                    scope.$watch(function () {
                        return AuthService.user.isLogged;
                    },
                        function () {
                            scope.local.isLogged = AuthService.user.isLogged;
                            scope.local.sameUser = scope.comment ? (scope.comment.author.username == AuthService.user.username) : false;
                        }
                    );

                }
            }
        }
    ])