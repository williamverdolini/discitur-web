angular.module('Lesson')
    .controller('LessonSearchCtrl', [
        '$scope',
        '$rootScope',
        'LabelService',
        '$state',
        'LessonService',
        function (
            $scope,
            $rootScope,
            LabelService,
            $state,
            LessonService
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
                        keyword: $scope.keyword,
                        discipline: $scope.discipline,
                        school: $scope.school,
                        classroom: $scope.classroom
                    });
                $scope.keyword = null;
                $scope.discipline = null;
                $scope.school = null
                $scope.classroom = null;
                $scope.viewAdvSearch = false;

                // If I don't want to preserve search/paging history navigation when the landing state is lessonSearch
                // I could use the following code, which doesn't change state transition (just event global broadcasting)
                /*
                if ($state.is('lessonNews') || $state.is('lessonSearch'))
                    $rootScope.$broadcast('LessonSearchEvent', { keyword: $scope.keyword })
                else
                    $state.go('lessonSearch', { keyword: $scope.keyword })
                */
            };

            $scope.getDisciplines = function (q) {
                return LessonService.getDistinctValues('discipline', { disciplineQ: q });
            }

            $scope.getSchools = function (q) {
                return LessonService.getDistinctValues('school', { schoolQ: q });
            }

            $scope.getClassRooms = function (q) {
                return LessonService.getDistinctValues('classroom', { classroomQ: q });
            }

            $scope.select = function(){
                console.log('ok');
            }

            //--------- model initialization ------
            $scope.labels = {
                keywordPlaceholder: _getLabel('keywordPlaceholder'),
                disciplinePlaceholder: _getLabel('disciplinePlaceholder'),
                schoolPlaceholder: _getLabel('schoolPlaceholder'),
                classroomPlaceholder: _getLabel('classroomPlaceholder'),
                searchButton: _getLabel('searchButton'),
                advancedSearchButton: _getLabel('advancedSearchButton')
            };
            $scope.keyword;
            $scope.discipline;
            $scope.school;
            $scope.classroom;
        }
    ]);