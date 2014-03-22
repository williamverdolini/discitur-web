angular.module("Discitur",
    [
        'ui.router',
        'Common',
        'Lesson',
        'disc.user',
        'ui.bootstrap',
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('LoadingInterceptor');

        // For any unmatched url, redirect to HomePage
        $urlRouterProvider.otherwise('/project/home');

        $stateProvider
            //MasterPages (Abstract States)
            .state('master', {
                url: '/',
                abstract: true,
                templateUrl: 'masterpages/master.html'
            })
            // One Column Layout (Abstract States)
            .state('master.1cl', {
                url: '',
                abstract: true,
                parent: 'master',
                templateUrl: 'masterpages/1cl.html'
            })
            // Two Columns Layout (Abstract States)
            .state('master.2cl', {
                url: '',
                abstract: true,
                parent: 'master',
                templateUrl: 'masterpages/2cl.html'
            })
            // Web Site (Content States)
            .state('master.1cl.home', {
                url: 'project/home',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/HomePage.html'
            })
            .state('master.1cl.mission', {
                url: 'project/mission',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/Project.html'
            })
            .state('master.1cl.about', {
                url: 'project/About',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/About.html'
            })
            .state('master.1cl.backstage', {
                url: 'project/backstage',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/BackStage.html'
            })
            .state('master.1cl.contribute', {
                url: 'project/contribute',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/Contribute.html'
            })

    })
    .constant('DisciturSettings', {
        apiUrl: 'http://localhost:59739/api/',
        authToken: 'disc.auth.token',
        criptoKey: '7061737323313233',
        viewHelp: 'disc.viewHelp',
        lastLessonsNum: 5
    })
    .factory('DiscUtil', ['$cacheFactory', function ($cacheFactory) {
        var _getMessage = function (obj) {
            var _message = "";
            for (var key in obj) {
                if (obj[key].constructor === Object)
                    _message += _getMessage(obj[key])
                else
                    _message += key + ":" + obj[key] + " ";
            }
            return _message;
        }

        return {
            validateInput: function (functionName, validInput, actualInput) {
                // accept only Object
                if (angular.isUndefined(actualInput) || !(Object.prototype.toString.call(actualInput) === '[object Object]'))
                    throw { code: 20001, message: 'invalid Input Type for ' + functionName + ' :' + _getMessage(actualInput) }
                if (angular.isDefined(actualInput)) {
                    // loop to check if input.properties (aka parametrs) are expected by the service validInput template
                    for (key in actualInput) {
                        // Angular private ($$) and Discitur private (_) are ignored
                        if (!(key.indexOf('$$') == 0 || key.indexOf('_') == 0) && !validInput.hasOwnProperty(key))
                            throw { code: 20002, message: 'invalid Input Parameter for ' + functionName + ' :' + _getMessage(actualInput) }
                        // If not passed in actualInput and if defined in validInput, set default value
                        //if (angular.isUndefined(actualInput[key]) && validInput[key] != null)
                        //    actualInput[key] = validInput[key];
                    }
                    // loop to set default values, if not set in actualInput
                    for (key in validInput) {
                        if ((angular.isUndefined(actualInput[key]) || actualInput[key] == null) && validInput[key] != null)
                            actualInput[key] = validInput[key];
                    }
                }

            },
            cache: $cacheFactory('disciturCache')


        }


    }])
    // LoadingInterceptor Intercepor:
    // display/hide loading bar
    .factory('LoadingInterceptor', [
        '$q',
        '$rootScope',
        'DisciturSettings',
        function ($q, $rootScope,DisciturSettings ) {
            return {
                request: function (config) {
                    if (config.url.indexOf(DisciturSettings.apiUrl)>=0)
                        $rootScope.$loading = true;
                    return config || $q.when(config);
                },
                response: function (result) {
                    if (result.config.url.indexOf(DisciturSettings.apiUrl) >= 0)
                        $rootScope.$loading = false;
                    return result || $q.when(result);
                },
                responseError: function (result) {
                    if ($rootScope.$loading)
                        $rootScope.$loading = false;
                    return $q.reject(result);
                }
            }
        }
    ]);
