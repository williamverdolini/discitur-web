angular.module('disc.lesson')
    .directive('lessonComment', [
        '$rootScope',
        'LessonService',
        'AuthService',
        'CommentDTO',
        '$timeout',
        '$location',
        '$anchorScroll',
        'DisciturBaseCtrl',
        '$injector',
        function ($rootScope, LessonService, AuthService, CommentDTO, $timeout, $location, $anchorScroll, DisciturBaseCtrl, $injector) {
            return {
                restrict: 'E',
                templateUrl: 'modules/lesson/LessonComment.html',
                replace: true,
                transclude: false,
                scope: {
                    comment: '=?',
                    lessonId: '@',
                    addComment: '&',
                    deleteComment: '&',
                    absUrl: '@?',
                },
                link: function (scope, element, attrs) {
                    // inherit Discitur Base Controller
                    $injector.invoke(DisciturBaseCtrl, this, { $scope: scope });
                    //-------- private properties -------
                    scope._ctrl = 'lessonCommentDrv';

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
                        showDeleteCommentErr: false,
                        commentIdHtml: angular.isDefined(scope.comment) ? 'l' + scope.lessonId + '-c' + scope.comment.id : null
                    }

                    scope.labels = {
                        comments: scope.getLabel('comments'),
                        commentPlaceholder: scope.getLabel('commentPlaceholder'),
                        commentHelp: scope.getLabel('commentHelp'),
                        commentAnswer: scope.getLabel('commentAnswer'),
                        commentEdit: scope.getLabel('commentEdit'),
                        commentPreview: scope.getLabel('commentPreview'),
                        commentSave: scope.getLabel('commentSave'),
                        commentRequired: scope.getLabel('commentRequired'),
                        commentNotDelete: scope.getLabel('commentNotDelete'),
                        editTooltip: scope.getLabel('editTooltip'),
                        deleteTooltip: scope.getLabel('deleteTooltip'),
                        commentShare: scope.getLabel('commentShare'),
                        commentShareClose: scope.getLabel('commentShareClose'),
                        commentShareTitle: scope.getLabel('commentShareTitle')
                    };

                    //-------- public methods-------
                    scope.actions = {
                        // call Sign Modal Dialog to login
                        openSignIn: function () {
                            $rootScope.$broadcast('disc.login', scope.actions)
                        },
                        // save User Comment
                        createComment: function () {
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
                                LessonService.createComment(_comment)
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
                        updateComment: function () {
                            // retrieve current form
                            var localForm = scope.local.UserEditCommentForm;
                            var localTxtArea = localForm.CommentTXT;
                            // check for validation error
                            if (localTxtArea.$valid) {
                                var _comment = new CommentDTO();
                                angular.extend(_comment, scope.comment);
                                _comment.content = localTxtArea.$modelValue

                                LessonService.updateComment(_comment)
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
                        },
                        closeShare : function () {
                            var _link = jQuery('#share' + scope.local.commentIdHtml);
                            var _scope = angular.element('#share' + scope.local.commentIdHtml).scope()
                            _scope.tt_isOpen = false;
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


                    var _hash = $location.hash();
                    if (angular.isDefined(_hash) && _hash === scope.local.commentIdHtml) {
                        $timeout(function () { $anchorScroll(); }, 300);
                    }

                }
            }
        }
    ])