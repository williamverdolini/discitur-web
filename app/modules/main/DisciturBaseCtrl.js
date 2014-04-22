angular.module('discitur')
    .factory('DisciturBaseCtrl',
    [
        //'LabelService',
        function () {
            function DisciturBaseCtrl($scope, LabelService, $location, $rootScope, $filter) {
                //-------- public methods-------
                $scope.absUrl = $location.absUrl();
                $scope.absUrlComponent = encodeURIComponent($scope.absUrl);
                //-------- public methods-------
                $scope.getLabel = function (label) {
                    return LabelService.get($scope._ctrl, label);
                };


                //--------- Controller initialization ------
                // detach static bindings (labels)
                var _watching = false;
                var _detachStaticWatchers = $scope.$watch(function () {
                    // first digest cycle: do nothing to populate view
                    if (!_watching) {
                        _watching = true;
                    }
                        // second digest cycle: remove static watchers
                    else {
                        var _reLabels = /^{{labels\..*}}/
                        for (var i = $scope.$$watchers.length - 1; i >= 0; i--) {
                            if ($scope.$$watchers[i].exp &&
                                $scope.$$watchers[i].exp.exp &&
                                _reLabels.test($scope.$$watchers[i].exp.exp)) {
                                $scope.$$watchers.splice(i, 1);
                            }
                        }
                        // detach this watch
                        _detachStaticWatchers();
                    }
                })
                // in order to use filters in Controllers
                $scope.filter = $filter;

                $scope._labels = {
                    appTitle : ''
                }

                $scope._actions = {
                    setTitle: function (iTitle) {
                        $rootScope.$broadcast('disc.setTitleEvent', { title: iTitle });
                    }
                }

            }
            DisciturBaseCtrl.$inject = ['$scope', 'LabelService', '$location','$rootScope','$filter'];
            return (DisciturBaseCtrl);

        }
    ]);

