angular.module('Lesson')
    .controller('LessonSideBarCtrl', [
        '$scope',
        'LabelService',
        'AuthService',
        '$state',
        'lessonData',
        function (
            $scope,
            LabelService,
            AuthService,
            $state,
            lessonData
            ) {
            //-------- private method -------
            // get label from LabelService dictionary
            var _getLabel = function (label) {
                return LabelService.get('LessonSideBarCtrl', label);
            }

            //-------- public method -------
            // Invoke search service for paging through state transition to preserve paging history
            // the state transition is forced cause the same params could be used in previous navigations


            //--------- public properties ------
            $scope.labels = {
                editLessonButton: _getLabel('editLessonButton')
            };

            $scope.local = {
                user: AuthService.user
            }

            $scope.actions = {
                editLesson: function () {
                    console.log(lessonData)
                    // set inherit option to false to avoid conflict with parameters in URL set by advancedSearch
                    $state.go('lessonEdit', { lessonId: lessonData.lessonId }, { inherit: false });
                }
            }

            //--------- Controller initialization ------
            // detach static bindings (labels)
            var counter = 0;
            var detachStaticScope = $scope.$watch(function () {
                counter += 1;
                if (counter > 1) {
                    for (var i = $scope.$$watchers.length - 1; i >= 0; i--) {
                        if ($scope.$$watchers[i].exp &&
                            $scope.$$watchers[i].exp.exp &&
                            $scope.$$watchers[i].exp.exp.indexOf('{{labels.') == 0) {
                            $scope.$$watchers.splice(i, 1);
                            detachStaticScope();
                        }
                    }
                }
                console.log($scope.$$watchers)
            })
        }
    ]);
