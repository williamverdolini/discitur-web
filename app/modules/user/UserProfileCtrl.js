angular.module('disc.user')
    .controller('UserProfileCtrl', [
        '$scope',
        'DisciturBaseCtrl',
        '$injector',
        'user',
        '$state',
        function (
            $scope,
            DisciturBaseCtrl,
            $injector,
            user,
            $state
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'UserProfileCtrl';
            //-------- private methods -------

            //--------- public properties ------
            $scope.labels = {
                //userName: $scope.getLabel('userName')
            };

            $scope.local = {
                user: user
            }
            //-------- public methods -------
            $scope.actions = {
            }

            //--------- Controller initialization ------
            $scope.$watch(function () {
                return $scope.local.user.isLogged;
            },
                function (isLogged) {
                    if (!isLogged)
                        $state.go('lessonSearch', {}, { inherit: false });
                }
            );


        }
    ]);
