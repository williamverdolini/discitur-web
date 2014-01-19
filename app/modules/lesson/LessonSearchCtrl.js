angular.module('Lesson')
    .controller('LessonSearchCtrl', [
        '$scope',
        '$rootScope',
        'LabelService',
        '$state',
        function (
            $scope,
            $rootScope,
            LabelService,
            $state
            ) {
            //--------- Controller private methods ------
            _getLabel = function (label) {
                return LabelService.get('LessonSearchCtrl', label);
            }            
            //--------- Controller public methods ------

            ///search
            ///@desc: broadcast globally LessonSearchEvent with keyword in form input in 'lessonNew' or 'lessonSearch' state, 
            ///        otherwise change state to lessonSearch with keyword param
            $scope.search = function () {
                if ($state.is('lessonNews') || $state.is('lessonSearch'))
                    $rootScope.$broadcast('LessonSearchEvent', { keyword: $scope.keyword, pagesize : 3 })
                else
                    $state.go('lessonSearch', { keyword: $scope.keyword })
                    //$state.go('lessonSearch', { q: { keyword: $scope.keyword } })
            };

            //--------- model initialization ------
            $scope.labels = {
                keywordPlaceholder: _getLabel('keywordPlaceholder'),
                searchButton: _getLabel('searchButton'),
                advancedSearchButton: _getLabel('advancedSearchButton')
            };
            $scope.keyword;
        }
    ]);