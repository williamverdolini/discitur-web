angular.module('Lesson',
    [
        'Discitur',
        'Common',
        'ngResource',
        //'ngRoute',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        //$urlRouterProvider.when('/lesson', '/lesson/1');

        $stateProvider
            /*
            .state('lessonNews', {
                url: '/lesson',
                parent: 'master.2cl',
                onEnter: function () {
                    console.log("Entering Lesson News");
                },
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/sidebar.html'
                    },
                    'main': {
                        templateUrl: 'modules/lesson/LessonNews.html',
                        controller: 'LessonNewsCtrl',
                        resolve: {
                            lessonNewsData: function (LessonService, $stateParams) {
                                return LessonService.search($stateParams);
                            }

                        }
                    }
                }
            })
        */
            .state('lessonSearch', {
                //url: '/lesson?keyword',
                url: '/lesson?keyword?discipline?school?classroom?rate?startRow?pageSize?orderBy?orderDir',
                parent: 'master.2cl',
                onEnter: function () {
                    console.log("Entering Lesson Search");
                },
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/sidebar.html'
                    },
                    'main': {
                        templateUrl: 'modules/lesson/LessonNews.html',
                        controller: 'LessonNewsCtrl',
                        resolve: {
                            lessonNewsData: function (LessonService, $stateParams) {
                                return LessonService.search($stateParams);
                            }

                        }
                    }
                }
            })
            .state('lessonDetail', {
                url: '/lesson/:lessonId',
                parent: 'master.2cl',
                onEnter: function () {
                    console.log("Entering Lesson Detail");
                },
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/sidebar.html'
                    },
                    'main':{
                        templateUrl: 'modules/lesson/Lesson.html',
                        controller: 'LessonCtrl',
                        onEnter: function () {
                            console.log("Entering lessonDetail");
                        },
                        resolve: {
                            lessonData: function (LessonService, $location, $q, $stateParams, $state) {
                                // create deferring result
                                var deferred = $q.defer();

                                console.log($stateParams.lessonId);
                                // During routing phase the $routeParams is not injected yet
                                var lessondId = $stateParams.lessonId //$route.current.params.lessonId;

                                // timeout only for test and study purpose (to erase)
                                //$timeout(function () {
                                LessonService.get({ id: lessondId })
                                    .then(
                                        // Success Callback
                                        function (result) {
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
                        }
                    }
                }
            })
            .state('404lesson', {
                url: '/404lesson',
                parent: 'master.2cl',
                views: {
                    'sidebar': {
                        templateUrl: 'modules/lesson/sidebar.html'
                    },
                    'main':{
                        controller: 'Lesson404Ctrl',
                        templateUrl: 'modules/lesson/Lesson404.html',
                        onEnter: function () {
                            console.log("master.2cl.404lesson");
                        }
                    }
                }
            });

    })