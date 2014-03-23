angular.module('Common')
    .directive('pwCheck', [
        '$rootScope',
        function ($rootScope) {
        return {
            restrict: 'A',
            require: 'ngModel',            
            
            scope:{
                pwCheck: '='
            },
            
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return;
                //var scope = scope;

                var _check = function (cPwd) {
                    var isValid = ngModel.$viewValue === cPwd;
                    ngModel.$setValidity('pwmatch', isValid);
                    return;
                }
                // watch on password value
                scope.$watch(
                    function () { return scope.pwCheck },
                    function () { _check(scope.pwCheck); }
                    );
                // watch on confirmPassword value
                scope.$watch(
                    function () { return ngModel.$viewValue },
                    function () { _check(scope.pwCheck); }
                    );

            }
        }
        }
    ]);