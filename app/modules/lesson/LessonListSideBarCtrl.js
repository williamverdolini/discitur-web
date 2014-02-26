﻿angular.module('Lesson')
    .controller('LessonListSideBarCtrl', [
        '$scope',
        'LabelService',
        'AuthService',
        '$state',
        function (
            $scope,
            LabelService,
            AuthService,
            $state
            ) {
            //-------- private method -------
            var _getLabel = function (label) {
                return LabelService.get('LessonListSideBarCtrl', label);
            }

            //-------- public method -------
            // Invoke search service for paging through state transition to preserve paging history
            // the state transition is forced cause the same params could be used in previous navigations


            //--------- public properties ------
            $scope.labels = {
                newLessonButton: _getLabel('newLessonButton')
            };

            $scope.local = {
                user: AuthService.user
            }

            $scope.actions = {
                newLesson: function () {
                    // set inherit option to false to avoid conflict with parameters in URL set by advancedSearch
                    $state.go('lessonEdit');                    
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
