angular.module('disc.user',
    [
        //'discitur',
        'disc.common',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap'
    ])
    .config(
    [
        '$httpProvider',
        '$stateProvider',
        '$urlRouterProvider', 
        '$uiViewScrollProvider',
        function ($httpProvider, $stateProvider, $urlRouterProvider, $uiViewScrollProvider) {
            $httpProvider.interceptors.push('UserAuthInterceptor');

            // to prevent autoscroll (introduced by angular-ui-router 0.2.8 https://github.com/angular-ui/ui-router/releases/tag/0.2.8)
            // see: https://github.com/angular-ui/ui-router/issues/787
            $uiViewScrollProvider.useAnchorScroll();


            $stateProvider
                .state('userProfile', {
                    url: 'userProfile',
                    parent: 'master.1cl',
                    authorized: true,
                    templateUrl: 'modules/user/UserProfile.html',
                    controller: 'UserProfileCtrl',
                    resolve: {
                        user: ['AuthService',function (AuthService) {
                            return AuthService.user;
                        }]
                    }
                })

        }
    ]
    );