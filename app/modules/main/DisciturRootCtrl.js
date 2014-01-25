angular.module("Discitur")
    .controller('DisciturRootCtrl', [
        '$scope',
        '$rootScope',
        'LabelService',
        function ($scope, $rootScope, LabelService) {
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

            //------- label initialization -------//
            var _getLabel = function (label) {
                return LabelService.get('DisciturMasterCtrl', label);
            }

            $scope.labels = {
                appTitle: _getLabel('appTitle')
            };

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

            //------- Event Global Broadcasting -------//
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //if (toState.resolve) {
                    console.log("$stateChangeStart")
                // Show a loading message until promises are not resolved
                $scope.loading = true;
                //}
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                console.log("$stateChangeSuccess")
                // Hide loading message
                $scope.loading = false;
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.warn('$stateChangeError: ' + _getMessage(error))
                // Hide loading message
                $scope.loading = false;
            });


        }
    ])



