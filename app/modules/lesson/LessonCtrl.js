angular.module('Lesson')
    .controller('LessonCtrl', [
        '$scope',
        'LabelService',
        '$sce',
        'lessonData',
        //'lessonGet',
        function (
            $scope,
            LabelService,
            $sce,
            lessonData//,lessonGet
            ) {
            //------- label initialization -------//
            _getLabel = function (label) {
                return LabelService.get('LessonCtrl', label);
            }

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
                conclusion: _getLabel('conclusion')
            };
            /***** model initialization ****/
            // lesson data async
            var currentLesson = lessonData;
            $scope.lesson = currentLesson;
            $scope.lesson.content = $sce.trustAsHtml(currentLesson.content);            
        }
    ]);
