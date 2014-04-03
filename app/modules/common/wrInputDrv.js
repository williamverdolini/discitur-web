angular.module('disc.common')
    .directive('wrInput', [
        '$rootScope',
        'LabelService',
        function ($rootScope, LabelService) {
            return {
                restrict: 'E',
                templateUrl: 'modules/common/wrInput.html',
                replace: true,
                transclude: false,
                scope: {
                    wrText: '=',
                    wrRef: '=',
                    editText : '&',
                    removeText: '&?'
                },
                link: function (scope, element, attrs) {
                    //-------- private methods-------
                    // call Label Service to get dynamic labels
                    var _getLabel = function (label) {
                        return LabelService.get('LessonRatingDrv', label);
                    }
                    var _initVal = scope.wrText;

                    //-------- private variables-------
                    //var form = element.find('form');

                    //-------- public properties-------
                    scope.local = {
                        edit: false,
                        isDeletable: angular.isDefined(attrs.removeText),
                        cssClass: angular.isDefined(attrs.wrClass) ? attrs.wrClass : '',
                        cssStyle: angular.isDefined(attrs.wrStyle) ? attrs.wrStyle : ''
                    }

                    scope.labels = {
                        editTooltip: _getLabel('editTooltip'),
                        deleteTooltip: _getLabel('deleteTooltip')
                    };

                    //-------- public methods-------
                    scope.actions = {
                        edit: function () {
                            scope.local.edit = !scope.local.edit;
                            if (_initVal != scope.wrText)
                                scope.editText({ ref: scope.wrRef })
                        },
                        remove: function () {
                            scope.removeText({ ref: scope.wrRef })
                        }
                        // Save & Update User Rating
                    }

                    //-------- Initialization -------
                    // if new Rating and the user is logged in, initialize the form


                }
            }
        }
    ])