angular.module('Lesson')
    .controller('LessonNewsCtrl', [
        '$scope',
        'LabelService',
        'lessonNewsData',
        'LessonService',
        function (
            $scope,
            LabelService,
            lessonNewsData,
            LessonService
            ) {
            
            //-------- label initialization -------
            _getLabel = function (label) {
                return LabelService.get('LessonNewsCtrl', label);
            }

            $scope.labels = {
                publishedOn: _getLabel('publishedOn'),
                viewMore: _getLabel('viewMore')
            };
            //--------- model initialization ------
            $scope.lessons = lessonNewsData;
            $scope.search = function (inputParams) {
                LessonService.search(inputParams).then(function (data) { $scope.lessons = data; })
            }

            $scope.$on('LessonSearchEvent', function (event, args) { $scope.search(args) })
        }
    ]);
