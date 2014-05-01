angular.module('disc.user',
    [
        //'discitur',
        'disc.common',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap',
        'angularFileUpload'
    ])
    .config(
    [
        '$httpProvider',
        '$stateProvider',
        '$urlRouterProvider', 
        '$uiViewScrollProvider',
        //'$fileUploader',
        function ($httpProvider, $stateProvider, $urlRouterProvider, $uiViewScrollProvider) {

            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            //// File Upload settings:
            //angular.extend(fileUploadProvider.defaults, {
            //    // Enable image resizing, except for Android and Opera,
            //    // which actually support image resizing, but fail to
            //    // send Blob objects via XHR requests:
            //    disableImageResize: /Android(?!.*Chrome)|Opera/
            //        .test(window.navigator.userAgent),
            //    //maxFileSize: 10000000,
            //    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
            //});

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