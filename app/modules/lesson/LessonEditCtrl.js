angular.module('Lesson')
    .controller('LessonEditCtrl', [
        '$scope',
        'LabelService',
        'AuthService',
        'lessonData',
        function (
            $scope,
            LabelService,
            AuthService,
            lessonData
            ) {
            //-------- private method -------
            var _getLabel = function (label) {
                return LabelService.get('LessonEditCtrl', label);
            }

            //-------- public method -------
            // Invoke search service for paging through state transition to preserve paging history
            // the state transition is forced cause the same params could be used in previous navigations


            //--------- public properties ------
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
                ratings: _getLabel('ratings'),
                ratingtHelp: _getLabel('ratingtHelp'),
                saveLessonButton: _getLabel('saveLessonButton'),
                publicLesson: _getLabel('publicLesson')
            };

            $scope.model = {
                content: null,
                tinymceoptions: {
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table contextmenu paste image"
                    ],
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
                }
            }

            $scope.local = {
                lesson: lessonData,
                user: AuthService.user
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



            //--------- Controller initialization ------
        }
    ]);
