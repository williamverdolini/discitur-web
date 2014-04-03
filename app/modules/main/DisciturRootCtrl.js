angular.module("discitur")
    .controller('DisciturRootCtrl', [
        '$scope',
        '$rootScope',
        'DisciturBaseCtrl',
        '$injector',
        'AuthService',
        '$state',
        '$urlRouter',
        function ($scope, $rootScope, DisciturBaseCtrl, $injector, AuthService, $state, $urlRouter) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'DisciturMasterCtrl';

            //------- private methods -------//
            var _getMessage = function (obj) {
                var _message = "";
                for (var key in obj) {
                    var _myKey = key;
                    if (obj[key].constructor === Object)
                        _message += _getMessage(obj[key])
                    else
                        _message += key + ":" + obj[key] + " ";
                }
                return _message;
            }

            // dynamic callback for change start event
            var changeStartCallbacks = [
                // 1. Initialize Authentication Data e delete itself
                function (event) {
                    event.preventDefault();
                    AuthService.resolveAuth()['finally'](function () {
                        // http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouter
                        // Continue with the update and state transition if logic allows
                        $urlRouter.sync();
                    });
                    changeStartCallbacks.splice(0, 1);

                },
                // 2. Manage authorized states
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState.authorized && !AuthService.user.isLogged) {
                        // event preventDefault to stop the flow and redirect
                        event.preventDefault();
                        $state.go('lessonSearch');
                    }
                }
            ]

            //-------- public properties -------
            $scope.labels = {
                appTitle: $scope.getLabel('appTitle'),
                loading: $scope.getLabel('loading'),
                testEnv: $scope.getLabel('testEnv')
            };

            //------- Global Event Management -------//
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //console.log("$stateChangeStart")
                changeStartCallbacks[0](event, toState, toParams, fromState, fromParams);
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                //console.log("$stateChangeSuccess")
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                //console.error('$stateChangeError: ' + error)
                if (toState.name === 'lessonDetail') {
                    // event preventDefault to stop the flow and redirect
                    //event.preventDefault();
                    return $state.go('404lesson');
                }
            });
        }
    ])



