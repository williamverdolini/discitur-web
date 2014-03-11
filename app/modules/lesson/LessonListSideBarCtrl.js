angular.module('Lesson')
    .controller('LessonListSideBarCtrl', [
        '$scope',
        'DisciturBaseCtrl',
        '$injector',
        'AuthService',
        '$state',
        'lastLessonList',
        function (
            $scope,
            DisciturBaseCtrl,
            $injector,
            AuthService,
            $state,
            lastLessonList
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'LessonListSideBarCtrl';
            //-------- private method -------

            //--------- public properties ------
            $scope.labels = {
                lastLessonsTitle: $scope.getLabel('lastLessonsTitle'),
                newLessonButton: $scope.getLabel('newLessonButton')
            };

            $scope.local = {
                user: AuthService.user,
                lastLessonList: lastLessonList
            }
            //-------- public method -------
            $scope.actions = {
                newLesson: function () {
                    // set inherit option to false to avoid conflict with parameters in URL set by advancedSearch
                    $state.go('lessonEdit');                    
                }
            }
        }
    ]);
