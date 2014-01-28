angular.module('disc.user')
    .controller('UserNavBar', [
        '$scope',
        'LabelService',
        '$state',
        '$modal',
        function (
            $scope,
            LabelService,
            $state,
            $modal
            ) {
            //-------- $scope properties ----
            $scope.labels;

            //-------- private method -------
            _getLabel = function (label) {
                return LabelService.get('UserNavBar', label);
            }
            //--------- model initialization ------
            $scope.labels = {
                userSigIn: _getLabel('userSigIn')
            };

            $scope.openSignIn = function () {
                var modalInstance = $modal.open({
                    backdrop: true,
                    windowClass: 'modal-signin',
                    templateUrl: 'UserSignIn',
                    controller: 'UserSignInCtrl'
                });

                modalInstance.result.then(function (selectedItem) {
                    //$scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            }

        }
    ]);
