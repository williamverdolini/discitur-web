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
            ///@desc: change state to lessonSearch with keyword param (to preserve navigation history)
            ///old
            ///@desc: broadcast globally LessonSearchEvent with keyword in form input in 'lessonNews' or 'lessonSearch' state, 
            ///        otherwise change state to lessonSearch with keyword param
            $scope.search = function () {
                $state.go('lessonSearch', { keyword: $scope.keyword })
                
                // If I don't want to preserve search/paging history navigation when the landing state is lessonSearch
                // I could use the following code, which doesn't change state transition (just event global broadcasting)
                /*
                if ($state.is('lessonNews') || $state.is('lessonSearch'))
                    $rootScope.$broadcast('LessonSearchEvent', { keyword: $scope.keyword })
                else
                    $state.go('lessonSearch', { keyword: $scope.keyword })
                */
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