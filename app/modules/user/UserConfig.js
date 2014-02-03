angular.module('disc.user',
    [
        'Discitur',
        'Common',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap'
    ])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('UserAuthInterceptor');
    }]);