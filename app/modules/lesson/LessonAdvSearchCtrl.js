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
                return LessonService.getDisciplines(q);
                //return LessonService.getDistinctValues('discipline', { disciplineQ: q });
            }

            $scope.getSchools = function (q) {
                return LessonService.getSchools(q);
                //return LessonService.getDistinctValues('school', { schoolQ: q });
            }

            $scope.getClassRooms = function (q) {
                return LessonService.getClassRooms(q);
                //return LessonService.getDistinctValues('classroom', { classroomQ: q });
            }

            $scope.getTags = function (q) {
                return LessonService.getTags(q);
                //return LessonService.getDistinctValues('tag', { tagQ: q });
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

            $scope.hoveringOver = function (value) {
                $scope.local.overStar = value;
            };

            $scope.ok = function () {
                $modalInstance.close(0);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };            

            $scope.advSearch = function () {
                if ($scope.local.searchForm.$valid) {
                    $state.go('lessonSearch',
                        {
                            keyword: $scope.local.keyword,
                            discipline: $scope.local.discipline,
                            school: $scope.local.school,
                            classroom: $scope.local.classroom,
                            rate: $scope.local.rate > 0 ? $scope.local.rate : null,
                            tags: $scope.local.searchedTags.length == 0 ? null : $scope.local.searchedTags.join()
                        },
                        {inherit : false});
                    $scope.local.keyword = null;
                    $scope.local.discipline = null;
                    $scope.local.school = null
                    $scope.local.classroom = null;
                    $scope.ok();
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
                rate: 0,
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
                advKeyword: _getLabel('advKeyword'),
                discipline: _getLabel('discipline'),
                school: _getLabel('school'),
                classroom: _getLabel('classroom'),
                rating: _getLabel('rating'),
                tag: _getLabel('tag'),
                cancel: _getLabel('cancel'),
                buttonAdd: _getLabel('buttonAdd'),
                buttonDel: _getLabel('buttonDel'),
                searchButton: _getLabel('searchButton'),
                advancedSearchButton: _getLabel('advancedSearchButton'),
                validationError: _getLabel('validationError')
            };
        }
    ]);

