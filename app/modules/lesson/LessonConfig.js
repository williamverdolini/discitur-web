angular.module('Lesson',
    [
        'Discitur',
        'Common',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap',
        'ui.tinymce'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        // provate method to load Lesson data by lessonId passed through $stateParams
        var _getLessonData = function (LessonService, $q, $stateParams, $state, DiscUtil) {
            // create deferring result
            var deferred = $q.defer();

            // During routing phase the $routeParams is not injected yet
            var lessondId = $stateParams.lessonId //$route.current.params.lessonId;

            // timeout only for test and study purpose (to erase)
            //$timeout(function () {
            LessonService.get({ id: lessondId })
                .then(
                    // Success Callback
                    function (result) {
                        //var cache = $cacheFactory('disciturCache');
                        //cache.put('currentLesson', result)
                        DiscUtil.cache.put('lesson', result)
                        deferred.resolve(result)
                    },
                    // Error Callback
                    function () {
                        deferred.reject("no Lesson for id:" + lessondId);
                        $state.go('404lesson')
                                            
                    });
            //}, 2000);

            return deferred.promise;
        }

        $stateProvider
            .state('lessonSearch', {
                url: 'lesson?keyword?discipline?school?classroom?rate?tags?publishedOn?publishedBy?startRow?pageSize?orderBy?orderDir',
                parent: 'master.2cl',
                onEnter: function () {
                    console.log("Entering Lesson Search");
                },
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/LessonListSideBar.html',
                        controller: 'LessonListSideBarCtrl'
                    },
                    'main': {
                        templateUrl: 'modules/lesson/LessonList.html',
                        controller: 'LessonListCtrl',
                        resolve: {
                            lessonsData: function (LessonService, $stateParams) {
                                return LessonService.search($stateParams);
                            }

                        }
                    }
                }
            })
            .state('lessonDetail', {
                url: 'lesson/:lessonId',
                parent: 'master.2cl',
                onEnter: function () {
                    console.log("Entering Lesson Detail");
                },
                // resolve create service data shared by component views
                resolve: {
                    lessonData: _getLessonData
                },
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/LessonSideBar.html',
                        controller: 'LessonSideBarCtrl'
                    },
                    'main': {
                        templateUrl: 'modules/lesson/Lesson.html',
                        controller: 'LessonCtrl'
                    }
                }
            })
            .state('lessonEdit', {
                url: 'edit/lesson/:lessonId',
                parent: 'master.1cl',
                onEnter: function () {
                    console.log("Entering Lesson Edit");
                },
                templateUrl: 'modules/lesson/LessonEdit.html',
                controller: 'LessonEditCtrl',
                resolve:{
                    lessonData: function (LessonService, $q, $stateParams, $state, DiscUtil) {
                        // try to get lesson from cache
                        // if not exists then load from service
                        var lessondId = $stateParams.lessonId
                        var cachedLessonData = DiscUtil.cache.get('lesson')

                        if (!angular.isDefined(cachedLessonData) || cachedLessonData.lessonId.toString() !== lessondId)
                            return _getLessonData(LessonService, $q, $stateParams, $state, DiscUtil);
                        else
                            return cachedLessonData;
                    }
                }
                    
            })
            .state('404lesson', {
                url: '404lesson',
                parent: 'master.2cl',
                onEnter: function () {
                    console.log("master.2cl.404lesson");
                },
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/sidebar.html'
                    },
                    'main':{
                        controller: 'Lesson404Ctrl',
                        templateUrl: 'modules/lesson/Lesson404.html'
                    }
                }
            });

    })