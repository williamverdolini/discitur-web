angular.module('Lesson')
    .controller('Lesson404Ctrl', [
        '$scope',
        'LabelService',
        function (
            $scope,
            LabelService) {
            /***** label initialization ****/
            _getLabel = function (label) {
                return LabelService.get('Lesson404Ctrl', label);
            }

            $scope.labels = {
                noLessonIdFound: _getLabel('noLessonIdFound')
            };
            
            console.log('404 Controller')
        }
    ]);