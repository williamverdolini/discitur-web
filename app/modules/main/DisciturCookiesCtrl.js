angular.module("discitur")
    .controller('DisciturCookiesCtrl', [
        '$scope',
        '$rootScope',
        'DisciturBaseCtrl',
        '$injector',
        '$state',
        'CookieNotificationService',
        function ($scope, $rootScope, DisciturBaseCtrl, $injector, $state, CookieNotificationService) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'DisciturCookiesCtrl';

            //------- private methods -------//


            //-------- public properties -------
            $scope.labels = {
                cookiesNotificationContent: $scope.getLabel('cookiesNotificationContent'),
                cookiesAccept: $scope.getLabel('cookiesAccept'),
                cookiesLaw: $scope.getLabel('cookiesLaw')
            };

            $scope.local = {
                currentState : $state.current
            }

            //$rootScope.$currentState = $state.current
            $rootScope.state = $state;

            //-------- public methods -------
            $scope.actions = {
                acceptCookieNotification: function () {
                    CookieNotificationService.acceptCookieNotification();
                    $rootScope.isCookiesAccepted = true;
                }
            }


        }
    ])




