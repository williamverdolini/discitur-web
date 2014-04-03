angular.module('discitur')
    .directive('doSignIn', [
        '$rootScope',
        'AuthService',
        function ($rootScope, AuthService) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.addClass('pointer');
                    element.click(function () {
                        if (!AuthService.user.isLogged)
                            $rootScope.$broadcast('disc.login', scope.actions);
                    })
                }
            }
        }
    ])