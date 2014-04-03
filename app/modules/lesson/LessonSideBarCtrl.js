angular.module('disc.lesson')
    .controller('LessonSideBarCtrl', [
        '$scope',
        'AuthService',
        '$state',
        'lessonData',
        'lastLessonList',
        'DisciturBaseCtrl',
        '$injector',
        function (
            $scope,
            AuthService,
            $state,
            lessonData,
            lastLessonList,
            DisciturBaseCtrl,
            $injector
             ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'LessonSideBarCtrl';

            //--------- public properties ------
            $scope.labels = {
                lastLessonsTitle: $scope.getLabel('lastLessonsTitle'),
                editLessonButton: $scope.getLabel('editLessonButton')
            };

            $scope.local = {
                user: AuthService.user,
                lesson: lessonData,
                lastLessonList: lastLessonList
            }

            //-------- public method -------
            $scope.actions = {
                editLesson: function () {
                    //console.log(lessonData)
                    // set inherit option to false to avoid conflict with parameters in URL set by advancedSearch
                    $state.go('lessonEdit', { lessonId: lessonData.lessonId }, { inherit: false });
                }
            }

            //--------- Controller initialization ------            
        }
    ]);
