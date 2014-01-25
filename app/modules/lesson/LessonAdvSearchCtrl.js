angular.module('Lesson')
    .controller('LessonAdvSearchCtrl', [
        '$scope',
        '$modalInstance',
        'LabelService',
        'LessonService',
        '$state',
        function (
            $scope,
            $modalInstance,
            LabelService,
            LessonService,
            $state
            ) {
            //--------- Controller private methods ------
            _getLabel = function (label) {
                return LabelService.get('LessonAdvSearchCtrl', label);
            }
            //--------- Controller public methods ------   
            $scope.getDisciplines = function (q) {
                return LessonService.getDistinctValues('discipline', { disciplineQ: q });
            }

            $scope.getSchools = function (q) {
                return LessonService.getDistinctValues('school', { schoolQ: q });
            }

            $scope.getClassRooms = function (q) {
                return LessonService.getDistinctValues('classroom', { classroomQ: q });
            }

            $scope.getTags = function (q) {
                return LessonService.getDistinctValues('tag', { tagQ: q });
            }

            $scope.addSearchedTag = function () {
                $scope.local.searchedTags.push($scope.local.tag);
                $scope.local.tag = null
            }

            $scope.selectTag = function () {
                $scope.addSearchedTag();
            }

            $scope.select = function (err) {
                $scope.local.errors[err] = false;
            }

            $scope.ok = function () {
                $modalInstance.close(1);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };            

            $scope.search = function () {
                if ($scope.local.searchForm.$valid) {
                    $state.go('lessonSearch',
                        {
                            keyword: $scope.local.keyword,
                            discipline: $scope.local.discipline,
                            school: $scope.local.school,
                            classroom: $scope.local.classroom,
                            tags: $scope.local.searchedTags.join()
                        });
                    $scope.local.keyword = null;
                    $scope.local.discipline = null;
                    $scope.local.school = null
                    $scope.local.classroom = null;
                    $modalInstance.close(1);
                }
                else {
                    if ($scope.local.searchForm.discipline.$invalid)
                        $scope.local.errors.discipline = true;
                    if ($scope.local.searchForm.school.$invalid)
                        $scope.local.errors.school = true;
                    if ($scope.local.searchForm.classroom.$invalid)
                        $scope.local.errors.classroom = true;
                }
            };

            //--------- model initialization ------
            // Modal Dialog is inherited scope, so it's important to set internal object, 
            // otherwhise Javascript search properties in parent scope if not exists in this scope
            // very very very important for form validation!! (https://github.com/angular-ui/bootstrap/issues/969)
            $scope.local = {
                keyword: null,
                discipline: null,
                school: null,
                classroom: null,
                searchedTags: [],
                tag: null,
                searchForm: {},
                showErrors: false,
                errors: {
                    discipline: false,
                    school: false,
                    classroom: false
                }
            };

            $scope.labels = {
                advKeywordPlaceholder: _getLabel('advKeywordPlaceholder'),
                disciplinePlaceholder: _getLabel('disciplinePlaceholder'),
                schoolPlaceholder: _getLabel('schoolPlaceholder'),
                classroomPlaceholder: _getLabel('classroomPlaceholder'),
                tagPlaceholder: _getLabel('tagPlaceholder'),
                buttonAdd: _getLabel('buttonAdd'),
                buttonDel: _getLabel('buttonDel'),
                searchButton: _getLabel('searchButton'),
                advancedSearchButton: _getLabel('advancedSearchButton'),
                validationError: _getLabel('validationError')
            };
        }
    ]);

