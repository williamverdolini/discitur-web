angular.module('Lesson')
    .controller('LessonSearchCtrl', [
        '$scope',
        '$rootScope',
        'LabelService',
        '$state',
        'LessonService',
        '$modal',
        function (
            $scope,
            $rootScope,
            LabelService,
            $state,
            LessonService,
            $modal
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
                $state.go('lessonSearch',
                    {
                        keyword: $scope.keyword//,
                        //discipline: $scope.discipline,
                        //school: $scope.school,
                        //classroom: $scope.classroom
                    });
                $scope.viewAdvSearch = false;
                $scope.keyword = null;
                // If I don't want to preserve search/paging history navigation when the landing state is lessonSearch
                // I could use the following code, which doesn't change state transition (just event global broadcasting)
                /*
                if ($state.is('lessonNews') || $state.is('lessonSearch'))
                    $rootScope.$broadcast('LessonSearchEvent', { keyword: $scope.keyword })
                else
                    $state.go('lessonSearch', { keyword: $scope.keyword })
                */
            };


            $scope.openAdvSearch = function () {
                var modalInstance = $modal.open({
                    backdrop: true,
                    windowClass: 'modal',
                    templateUrl: 'LessonAdvSearch',
                    controller: 'LessonAdvSearchCtrl'
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }

            //--------- model initialization ------
            $scope.labels = {
                keywordPlaceholder: _getLabel('keywordPlaceholder'),
                searchButton: _getLabel('searchButton'),
                advancedSearchButton: _getLabel('advancedSearchButton')
            };
            $scope.keyword;
        }
    ]);