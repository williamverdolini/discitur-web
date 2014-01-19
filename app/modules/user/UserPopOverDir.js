angular.module('User')
    .directive('discUserPopOver', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'EA',
            templateUrl: 'template/user-popover.html',
            link: function (scope, element, attrs) {

            }
        }
    }]);
