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
                    url: 'user/profile',
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
                .state('userActivation', {
                    url: 'user/activation?username?key',
                    parent: 'master.1cl',
                    onEnter: function (activation) {
                        console.log(activation);
                    },
                    onExit: function (activation) {
                        console.log(activation);
                    },
                    templateUrl: 'modules/user/UserActivation.html',
                    controller: 'UserActivationCtrl',
                    resolve: {
                        activation: function (AuthService, $stateParams) {
                            return AuthService.activate($stateParams).catch(
                                function (data) { return { notActive: true };}
                                );
                        }
                    }
                })

        }
    ]
    );