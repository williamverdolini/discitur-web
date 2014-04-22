angular.module("discitur",
    [
        'ui.router',
        'ui.bootstrap',
        'disc.settings',
        'disc.common',
        'disc.lesson',
        'disc.user'
    ])
    .config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        'DisciturSettings',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, DisciturSettings, $locationProvider) {
            // for HTML5 mode
            //$locationProvider.html5Mode(true)
            // for HashBang mode
            $locationProvider.html5Mode(false).hashPrefix('!');
            $httpProvider.interceptors.push('LoadingInterceptor');

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

            if (DisciturSettings.isInMaintenance) {
                $urlRouterProvider.otherwise('/project/maintenance');
                $stateProvider
                // Web Site (Content States)
                .state('master.1cl.home', {
                    url: 'project/maintenance',
                    parent: 'master.1cl',
                    templateUrl: 'modules/main/site/Maintenance.html'
                })
            }
            else {
                // For any unmatched url, redirect to HomePage
                $urlRouterProvider.otherwise('/project/home');

                $stateProvider
                // Web Site (Content States)
                .state('master.1cl.home', {
                    url: 'project/home',
                    parent: 'master.1cl',
                    templateUrl: 'modules/main/site/HomePage.html'
                })
                .state('master.1cl.mission', {
                    url: 'project/mission',
                    parent: 'master.1cl',
                    title : 'manifestTitle',
                    templateUrl: 'modules/main/site/Project.html'
                })
                .state('master.1cl.about', {
                    url: 'project/About',
                    parent: 'master.1cl',
                    title: 'aboutTitle',
                    templateUrl: 'modules/main/site/About.html'
                })
                .state('master.1cl.backstage', {
                    url: 'project/backstage',
                    parent: 'master.1cl',
                    title: 'backstageTitle',
                    templateUrl: 'modules/main/site/BackStage.html'
                })
                .state('master.1cl.contribute', {
                    url: 'project/contribute',
                    parent: 'master.1cl',
                    title: 'contributeTitle',
                    templateUrl: 'modules/main/site/Contribute.html'
                })

            }

    }
    ])
    .run([
        'DisciturSettings',
        '$rootScope',
        function (DisciturSettings, $rootScope) {
            $rootScope.testEnv = DisciturSettings.testEnv;
        }
    ])
