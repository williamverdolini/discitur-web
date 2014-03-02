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

            console.log(AuthService.user.isLogged)
            console.log(lessonData.author.username)

            $scope.local = {
                user: AuthService.user,
                lesson: lessonData
            }

            console.log(lessonData)

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
            var _watchers = null;
            /*
            var _detachStaticWatchers = $scope.$watch(function () {
                // first digest cycle: find static watchers
                if (_watchers == null) {
                    _watchers = [];
                    var _reLabels = /^{{labels\.\w+}}$/
                    for (var i = $scope.$$watchers.length - 1; i >= 0; i--) {
                        if ($scope.$$watchers[i].exp &&
                            $scope.$$watchers[i].exp.exp &&
                            _reLabels.test($scope.$$watchers[i].exp.exp)) {
                            _watchers.push(i);
                        }
                    }
                }
                // second digest cycle: remove static watchers
                else {
                    for (var i = 0; i < _watchers.length; i++) {
                        $scope.$$watchers.splice(_watchers[i], 1);
                    }
                    _detachStaticWatchers();
                }
            })
            */
            
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
            })
            
        }
    ]);
