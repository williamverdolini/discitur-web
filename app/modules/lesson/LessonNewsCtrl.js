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
            //-------- $scope properties ----
            $scope.labels;
            $scope.searchInput;
            $scope.lessons;
            $scope.totalLessons;
            $scope.currentPage;
            $scope.pageSize;

            //-------- private method -------
            _getLabel = function (label) {
                return LabelService.get('LessonNewsCtrl', label);
            }
            _setPageData = function (lessonsPage) {
                $scope.lessons = lessonsPage.lessons;
                $scope.totalLessons = lessonsPage.count
                $scope.currentPage = (lessonsPage.startRow - lessonsPage.startRow % lessonsPage.pageSize) / lessonsPage.pageSize + 1
                $scope.pageSize = lessonsPage.pageSize
            }

            //-------- public method -------
            $scope.search = function (inputParams) {
                $scope.searchInput = inputParams;

                LessonService.search(inputParams).then(
                    function (data) {
                        //$scope.lessons = data.lessons;
                        _setPageData(data)
                    })
            }

            $scope.getPage = function (pager) {
                var input = $scope.searchInput;
                input.startRow = (pager.pageNum - 1) * $scope.pageSize;
                $scope.search(input);
            }

            //--------- model initialization ------
            $scope.labels = {
                publishedOn: _getLabel('publishedOn'),
                viewMore: _getLabel('viewMore')
            };
            //$scope.lessons = lessonNewsData.lessons;
            //$scope.count = lessonNewsData.count
            //$scope.page = lessonNewsData.startRow % lessonNewsData.pageSize
            _setPageData(lessonNewsData)

            $scope.$on('LessonSearchEvent', function (event, args) { $scope.search(args) })
        }
    ]);
