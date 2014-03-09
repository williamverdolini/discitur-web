angular.module("Discitur")
    .controller('DisciturRootCtrl', [
        '$scope',
        '$rootScope',
        'DisciturBaseCtrl',
        '$injector',
        'AuthService',
        '$state',
        function ($scope, $rootScope, DisciturBaseCtrl, $injector, AuthService, $state) {
            //-----------------------------------------------------------
            // Loading layer management
            // 
            // thanks to: http://www.youtube.com/watch?v=P6KITGRQujQ&list=UUKW92i7iQFuNILqQOUOCrFw&index=4&feature=plcp
            //-----------------------------------------------------------
            /*
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if (next.$$route && next.$$route.resolve) {
                    // Show a loading message until promises are not resolved
                    console.log("$routeChangeStart")
                    $scope.loading = true;
                }
            });
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                // Hide loading message
                console.log("$routeChangeSuccess")
                $scope.loading = false;
            });
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                // Hide loading message
                console.warn(rejection)
                $scope.loading = false;
            });
            */

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

            //-------- public properties -------
            $scope.labels = {
                appTitle: $scope.getLabel('appTitle'),
                loading: $scope.getLabel('loading')
            };

            //------- Global Event Management -------//
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                console.log("$stateChangeStart")
                // Default behaviour for authorized states: redirect to login page (in this app to the lesson list page)
                if (toState.authorized && !AuthService.user.isLogged) {
                    // event preventDefault to stop the flow and redirect
                    event.preventDefault();
                    $state.go('lessonSearch');
                }
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                console.log("$stateChangeSuccess")
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.error('$stateChangeError: ' + error)
            });


        }
    ])



