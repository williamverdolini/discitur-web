angular.module('Lesson')
    .directive('lessonRating', [
        '$rootScope',
        'LabelService',
        'LessonService',
        'AuthService',
        'RatingDTO',
        '$timeout',
        function ($rootScope, LabelService, LessonService, AuthService, RatingDTO, $timeout) {
            return {
                restrict: 'E',
                templateUrl: 'modules/lesson/LessonRating.html',
                replace: true,
                transclude: false,
                scope: {
                    userRating: '=?',
                    lessonId: '@',
                    addRating: '&',
                    deleteRating: '&'
                },
                link: function (scope, element, attrs) {
                    //-------- private methods-------

                    // call Label Service to get dynamic labels
                    var _getLabel = function (label) {
                        return LabelService.get('LessonRatingDrv', label);
                    }
                    // Initialize New User Rating
                    var setNewUserRating = function () {
                        scope.userRating = new RatingDTO();
                        scope.userRating.lessonId = scope.lessonId;
                        scope.userRating.author.userid = AuthService.user.userid
                        scope.userRating.author.username = AuthService.user.username;
                        scope.userRating.author.image = AuthService.user.image
                        scope.local.sameUser = true;
                        scope.local.edit = true;
                        //scope.local.EditText = "";
                    }

                    //-------- private variables-------
                    var form = element.find('form');

                    //-------- public properties-------
                    scope.local = {
                        ratingText: null,
                        ratingError: null,
                        UserRatingForm: form.controller('form'),
                        newRating: angular.isUndefined(scope.userRating),
                        user: AuthService.user,
                        sameUser: scope.userRating ? (scope.userRating.author.username == AuthService.user.username) : false,
                        edit: false,
                        EditText: "",
                        EditRating: null,
                        showDeleteRatingErr: false,
                        showNoRatingErr: false
                    }

                    scope.labels = {
                        ratings: _getLabel('ratings'),
                        ratingPlaceholder: _getLabel('ratingPlaceholder'),
                        ratingtHelp: _getLabel('ratingtHelp'),
                        ratingEdit: _getLabel('ratingEdit'),
                        ratingPreview: _getLabel('ratingPreview'),
                        ratingSave: _getLabel('ratingSave'),
                        ratingRequired: _getLabel('ratingRequired'),
                        ratingNotDelete: _getLabel('ratingNotDelete'),
                        ratingInput: _getLabel('ratingInput'),
                        editTooltip: _getLabel('editTooltip'),
                        deleteTooltip: _getLabel('deleteTooltip')
                    };

                    //-------- public methods-------
                    scope.actions = {
                        // Save & Update User Rating
                        saveRating: function () {
                            // retrieve current form
                            var localForm = scope.local.UserRatingForm;
                            var localTxtArea = localForm.EditText;
                            // check for validation error
                            if (scope.local.EditRating > 0) {
                                if (scope.local.newRating) {
                                    var _rating = new RatingDTO();
                                    _rating.lessonId = scope.lessonId;
                                    _rating.rating = scope.local.EditRating;
                                    _rating.content = localTxtArea.$modelValue;
                                    _rating.author.userid = AuthService.user.userid;
                                    LessonService.createRating(_rating)
                                        .then(function (savedRating) {
                                            //  Parent controll method to add new Rating into local lesson's Rating array
                                            scope.addRating({ rating: savedRating });
                                            // Reset local Form
                                            localForm.$setPristine();
                                        })
                                }
                                else {
                                    scope.userRating.rating = scope.local.EditRating;
                                    scope.userRating.content = localTxtArea.$modelValue;
                                    LessonService.updateRating(scope.userRating)
                                        .then(function (modifiedRating) {
                                            scope.userRating = modifiedRating;
                                            scope.local.edit = false;
                                            localForm.$setPristine();
                                        })

                                }
                            }
                            else {
                                scope.local.showNoRatingErr = true;
                                $timeout(function () { scope.local.showNoRatingErr = false }, 5000);
                            }
                        },
                        // Delete User Rating
                        deleteRating: function () {
                            LessonService.deleteRating(scope.userRating)
                                .then(
                                    function (deletedRating) {
                                        //  Parent controll method to add new comment into local lesson's comment array
                                        scope.deleteRating({ rating: deletedRating });
                                    },
                                    function (errorData) {
                                        scope.local.showDeleteRatingErr = true;
                                        $timeout(function () { scope.local.showDeleteRatingErr = false }, 5000);
                                    }
                                )
                        },
                        editRating: function () {
                            scope.local.edit = !scope.local.edit;
                            scope.local.EditText = scope.userRating.content;
                            scope.local.EditRating = scope.userRating.rating;
                        }
                    }

                    //-------- Initialization -------
                    // if new Rating and the user is logged in, initialize the form
                    if (scope.local.newRating && scope.local.user.isLogged) {
                        setNewUserRating();
                    }
                    // set the watcher on Authentication properties
                    scope.$watch(
                        //'local.user.isLogged',
                        function () { return scope.local.user.isLogged },
                        function () {
                            if (scope.local.newRating)
                                setNewUserRating();
                            scope.local.sameUser = scope.userRating ? (scope.userRating.author.username == scope.local.user.username) : false;
                        }
                    );
                    

                }
            }
        }
    ])