angular.module('Lesson')
    .controller('LessonEditCtrl', [
        '$scope',
        'LabelService',
        function (
            $scope,
            LabelService
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
                newLessonButton: _getLabel('newLessonButton')
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

            //--------- Controller initialization ------
        }
    ]);
