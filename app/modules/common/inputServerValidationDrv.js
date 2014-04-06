angular.module('disc.common')
    .directive('serverValidation', [
        '$rootScope',
        function ($rootScope) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    serverValidation: '&'
                },

                link: function (scope, element, attrs, ngModel) {
                    if (!ngModel) return;
                    //var scope = scope;

                    element.blur(function () {
                        //console.log("Controlla a server il valore:" + ngModel.$viewValue);
                        ngModel.$setValidity('serverCheck', false);
                        scope.serverValidation({ inputValue: ngModel.$viewValue }).then(
                                function (result) {
                                    ngModel.$setValidity('serverCheck', result)
                                },
                                function (error) {
                                    ngModel.$setValidity('serverCheck', false)
                                }
                            );
                    })

                }
            }
        }
    ]);