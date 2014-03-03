angular.module('Lesson')
    .controller('LessonEditCtrl', [
        '$scope',
        'LabelService',
        'AuthService',
        'lessonData',
        'LessonService',
        '$state',
        function (
            $scope,
            LabelService,
            AuthService,
            lessonData,
            LessonService,
            $state
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
                lessonTitleHeading: _getLabel('lessonTitleHeading'),
                lessonTitle: _getLabel('lessonTitle'),
                specifics: _getLabel('specifics'),
                discipline: _getLabel('discipline'),
                school: _getLabel('school'),
                classroom: _getLabel('classroom'),
                tags: _getLabel('tags'),
                author: _getLabel('author'),
                publishedOn: _getLabel('publishedOn'),
                rating: _getLabel('rating'),
                content: _getLabel('content'),
                lessonGoods: _getLabel('lessonGoods'),
                noLessonGoods: _getLabel('noLessonGoods'),
                lessonBads: _getLabel('lessonBads'),
                noLessonBads: _getLabel('noLessonBads'),
                conclusion: _getLabel('conclusion'),
                comments: _getLabel('comments'),
                ratings: _getLabel('ratings'),
                ratingtHelp: _getLabel('ratingtHelp'),
                saveLessonButton: _getLabel('saveLessonButton'),
                cancelButton: _getLabel('cancelButton'),
                publicLesson: _getLabel('publicLesson'),
                buttonAdd: _getLabel('buttonAdd'),
                buttonDel: _getLabel('buttonDel'),
                requiredField: _getLabel('requiredField'),
                helpTitle: _getLabel('helpTitle'),
                helpSpecifics: _getLabel('helpSpecifics'),
                helpTags: _getLabel('helpTags'),
                helpContent: _getLabel('helpContent'),
                helpFeedbacks: _getLabel('helpFeedbacks'),
                helpConclusion: _getLabel('helpConclusion')
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

            $scope.local = {
                lesson: lessonData,
                user: AuthService.user,
                tag: null,
                lessonGood: null,
                lessonBad: null,
                searchedTags: [],
                editForm: {},
                isToolBarVisible: function () {
                    if ($scope.local.user.isLogged) {
                        return $scope.local.lesson.lessonId ? $scope.local.user.username == $scope.local.lesson.author.username : true;
                    }
                    else
                        return false;
                    //local.user.isLogged && local.user.username == local.lesson.author.username
                },
                isFieldRequired : function(fieldName){
                    return $scope.local.editForm[fieldName].$invalid && ($scope.local.editForm[fieldName].$dirty || $scope.local.editForm.submitted)
                }
            }

            $scope.actions = {
                // custom filter to select object with status prop != 'C' (Not Canceled)
                filterByActiveStatus: function (feedback) {
                    return feedback.status != 'C';
                },
                // get existant tags value searched by input
                getTags: function (q) {
                    return LessonService.getDistinctValues('tag', { tagQ: q });
                },
                getDisciplines: function (q) {
                    return LessonService.getDisciplines(q);
                },
                getSchools: function (q) {
                    return LessonService.getSchools(q);
                },
                getClassRooms: function (q) {
                    return LessonService.getClassRooms(q);
                },
                // Select and add new Tag to the Lesson
                selectTag: function () {
                    //$scope.actions.addSearchedTag();
                    if ($scope.local.tag != null && $scope.local.tag != "") {
                        // Tag Array not modified if tag already exists
                        for (var i = 0; i < $scope.local.lesson.tags.length; i++)
                            if ($scope.local.lesson.tags[i] === $scope.local.tag)
                                return;
                        // add new tag
                        $scope.local.lesson.tags.push({lessonId:$scope.local.lesson.lessonId, content:$scope.local.tag, status:'A'});
                        $scope.local.lesson.tags.status = 'M'; // Modified
                        $scope.local.tag = null;
                    }

                },
                // Remove Tag
                removeTag: function (ref) {
                    $scope.local.lesson.tags[ref].status = 'C'; // bad feedback Canceled
                },
                // Add new Good Feedback
                addGood: function () {
                    if ($scope.local.lessonGood != "" && $scope.local.lessonGood != null) {
                        // lessonGood Array is not modified if lessonGood already exists
                        for (var i = 0; i < $scope.local.lesson.goods.length; i++)
                            if ($scope.local.lesson.goods[i].content === $scope.local.lessonGood)
                                return;
                        $scope.local.lesson.goods.push({ id: null, content: $scope.local.lessonGood, status: 'A' }); // Added
                        $scope.local.lessonGood = null;
                    }
                },
                // Edit Good Feedback
                editGood: function (ref) {
                    if($scope.local.lesson.goods[ref].status == 'I')
                       $scope.local.lesson.goods[ref].status = 'M'; // good feedback Modified
                },
                // Remove Good Feedback
                removeGood: function (ref) {
                    $scope.local.lesson.goods[ref].status = 'C'; // good feedback Canceled
                    //$scope.local.lesson.goods.splice(ref, 1)
                },
                // Add new Bad Feedback
                addBad: function () {
                    if ($scope.local.lessonBad != "" && $scope.local.lessonBad != null) {
                        // lessonBad Array is not modified if lessonBad already exists
                        for (var i = 0; i < $scope.local.lesson.bads.length; i++)
                            if ($scope.local.lesson.bads[i].content === $scope.local.lessonBad)
                                return;
                        //$scope.local.lesson.bads.push($scope.local.lessonBad);
                        $scope.local.lesson.bads.push({ id: null, content: $scope.local.lessonBad, status: 'A' }); // Added
                        $scope.local.lessonBad = null;
                    }
                },
                // Edit Bad Feedback
                editBad: function (ref) {
                    if ($scope.local.lesson.bads[ref].status == 'I')
                        $scope.local.lesson.bads[ref].status = 'M'; // bad feedback Modified
                },
                // Remove Bad Feedback
                removeBad: function (ref) {
                    $scope.local.lesson.bads[ref].status = 'C'; // bad feedback Canceled
                    //$scope.local.lesson.bads.splice(ref, 1)
                },
                // Save Lesson
                saveLesson: function () {
                    $scope.local.editForm.submitted = true;
                    if ($scope.local.editForm.$valid) {
                        console.log($scope.local.lesson);
                        $scope.local.lesson.author = $scope.local.user;
                        $scope.local.lesson.lastModifUser = $scope.local.user.username;

                        if (!$scope.local.lesson.lessonId){
                            $scope.local.lesson.lessonId = 0;
                            LessonService.create($scope.local.lesson)
                                .then(function (data) {// success
                                    $state.go('lessonDetail', { lessonId: data.lessonId }, { inherit: false });
                                })
                        }
                        else {
                            LessonService.save($scope.local.lesson)
                                .then(function (data) {// success
                                    $state.go('lessonDetail', { lessonId: data.lessonId }, { inherit: false });
                                })
                        }

                    }
                },
                // Cancel editing operation
                cancelEditing: function () {
                    // set inherit option to false to avoid conflict with parameters in URL set by advancedSearch
                    if ($scope.local.lesson.lessonId > 0)
                        $state.go('lessonDetail', { lessonId: lessonData.lessonId }, { inherit: false });
                    else
                        $state.go('lessonSearch', { keywod: ''}, { inherit: false });
                }


            }


            //--------- Controller initialization ------
            // detach static bindings (labels)
            var counter = 0;
            var detachStaticScope = $scope.$watch(function () {
                counter += 1;
                if (counter > 1) {
                    for (var i = $scope.$$watchers.length - 1; i >= 0; i--) {
                        if ($scope.$$watchers[i].exp &&
                            $scope.$$watchers[i].exp.exp &&
                            $scope.$$watchers[i].exp.exp.indexOf('{{labels.') == 0) {
                            $scope.$$watchers.splice(i, 1);
                            detachStaticScope();
                        }
                    }
                }
                console.log($scope.$$watchers)
            })



            //--------- Controller initialization ------
        }
    ]);
