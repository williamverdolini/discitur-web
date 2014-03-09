angular.module('disc.user',
    [
        'Discitur',
        'Common',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap'
    ])
    .config(
    [
        '$httpProvider',
        '$stateProvider',
        function ($httpProvider, $stateProvider) {
            $httpProvider.interceptors.push('UserAuthInterceptor');

            $stateProvider
                .state('userProfile', {
                    url: 'userProfile',
                    parent: 'master.1cl',
                    authorized: true,
                    templateUrl: 'modules/user/UserProfile.html',
                    controller: 'UserProfileCtrl',
                    resolve: {
                        user: function (AuthService) { return AuthService.user; }
                    }
                })

        }
    ]);