angular.module('Lesson')
    .controller('LessonEditCtrl', [
        '$scope',
        //'LabelService',
        'AuthService',
        'lessonData',
        'LessonService',
        '$state',
        'DisciturBaseCtrl',
        '$injector',
        'DisciturSettings',
        function (
            $scope,
            //LabelService,
            AuthService,
            lessonData,
            LessonService,
            $state,
            DisciturBaseCtrl,
            $injector,
            DisciturSettings
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'LessonEditCtrl';

            //-------- private methods -------
            var _initViewHelp = function () {
                // get viewHelp setting from localStorage
                // otherwise set initial viewHelp setting to default value (true).
                var _viewHelp = localStorage.getItem(DisciturSettings.viewHelp);
                if(_viewHelp !== null)
                    $scope.local.viewHelp = $scope.$eval(_viewHelp);
                else
                    localStorage.setItem(DisciturSettings.viewHelp, $scope.local.viewHelp);
            }

            //--------- public properties ------
            $scope.labels = {
                lessonTitleHeading: $scope.getLabel('lessonTitleHeading'),
                lessonTitle: $scope.getLabel('lessonTitle'),
                specifics: $scope.getLabel('specifics'),
                discipline: $scope.getLabel('discipline'),
                school: $scope.getLabel('school'),
                classroom: $scope.getLabel('classroom'),
                tags: $scope.getLabel('tags'),
                author: $scope.getLabel('author'),
                publishedOn: $scope.getLabel('publishedOn'),
                rating: $scope.getLabel('rating'),
                content: $scope.getLabel('content'),
                lessonGoods: $scope.getLabel('lessonGoods'),
                noLessonGoods: $scope.getLabel('noLessonGoods'),
                lessonBads: $scope.getLabel('lessonBads'),
                noLessonBads: $scope.getLabel('noLessonBads'),
                conclusion: $scope.getLabel('conclusion'),
                comments: $scope.getLabel('comments'),
                ratings: $scope.getLabel('ratings'),
                ratingtHelp: $scope.getLabel('ratingtHelp'),
                saveLessonButton: $scope.getLabel('saveLessonButton'),
                cancelButton: $scope.getLabel('cancelButton'),
                publicLesson: $scope.getLabel('publicLesson'),
                buttonAdd: $scope.getLabel('buttonAdd'),
                buttonDel: $scope.getLabel('buttonDel'),
                requiredField: $scope.getLabel('requiredField'),
                showHideHelp: $scope.getLabel('showHideHelp'),
                helpTitle: $scope.getLabel('helpTitle'),
                helpSpecifics: $scope.getLabel('helpSpecifics'),
                helpTags: $scope.getLabel('helpTags'),
                helpContent: $scope.getLabel('helpContent'),
                helpFeedbacks: $scope.getLabel('helpFeedbacks'),
                helpConclusion: $scope.getLabel('helpConclusion'),
                addItem: $scope.getLabel('addItem')
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
                },
                isFieldRequired : function(fieldName){
                    return $scope.local.editForm[fieldName].$invalid && ($scope.local.editForm[fieldName].$dirty || $scope.local.editForm.submitted)
                },
                viewHelp: true
            }


            //-------- public methods -------

            $scope.actions = {
                // custom filter to select object with status prop != 'C' (Not Canceled)
                filterByActiveStatus: function (feedback) {
                    return feedback.status != 'C';
                },
                // get existant tags value searched by input
                getTags: function (q) {
                    return LessonService.getTags(q);
                },
                // get existant Disciplines value searched by input
                getDisciplines: function (q) {
                    return LessonService.getDisciplines(q);
                },
                // get existant schools value searched by input
                getSchools: function (q) {
                    return LessonService.getSchools(q);
                },
                // get existant classroom value searched by input
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
                        //console.log($scope.local.lesson);
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
                            LessonService.update($scope.local.lesson)
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
                },
                // Show/Hide View Help setting
                showHideHelp: function () {
                    //localStorage.removeItem(DisciturSettings.viewHelp);
                    $scope.local.viewHelp = !$scope.local.viewHelp;
                    localStorage.setItem(DisciturSettings.viewHelp, $scope.local.viewHelp);
                }

            }

            //--------- Controller initialization ------
            _initViewHelp();

            $scope.$watch(function () {
                return AuthService.user.isLogged;
            },
                function (isLogged) {
                    if (!isLogged)
                        $state.go('lessonSearch', { keyword: '' }, { inherit: false });
                }
            );

        }
    ]);
