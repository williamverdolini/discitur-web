﻿angular.module('disc.common')
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

                    element.blur(function () {
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