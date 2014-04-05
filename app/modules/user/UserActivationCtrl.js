angular.module('disc.user')
    .controller('UserActivationCtrl', [
        '$scope',
        'DisciturBaseCtrl',
        '$injector',
        'activation',
        '$state',
        function (
            $scope,
            DisciturBaseCtrl,
            $injector,
            activation,
            $state
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'UserActivationCtrl';
            //-------- private methods -------

            //--------- public properties ------
            $scope.labels = {
                activationSuccess: $scope.getLabel('activationSuccess'),
                activationFailed: $scope.getLabel('activationFailed')
            };

            $scope.local = {
                activated : activation.notActive ? false : true
            }
            //-------- public methods -------
            $scope.actions = {
                ok: function () {
                    $state.go('lessonSearch', {}, { inherit: false });
                }
            }


        }
    ]);
