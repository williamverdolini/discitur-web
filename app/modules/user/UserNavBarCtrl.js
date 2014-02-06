angular.module('disc.user')
    .controller('UserNavBar', [
        '$scope',
        'LabelService',
        '$state',
        '$modal',
        'AuthService',
        function ($scope,LabelService,$state,$modal,AuthService) {
            //-------- private properties -------
            var modalInstance;
            //-------- public properties ----
            $scope.labels;
            $scope.actions;

            //-------- private methods -------
            _getLabel = function (label) {
                return LabelService.get('UserNavBar', label);
            }

            //-------- public methods -------
            $scope.actions = {
                openSignIn: function (actions) {
                    modalInstance = $modal.open({
                        backdrop: true,
                        windowClass: 'modal-signin',
                        templateUrl: 'UserSignIn',
                        controller: 'UserSignInCtrl'
                    });

                    modalInstance.result.then(function (selectedItem) {
                        // login caller callback
                        if (actions.ok)
                            actions.ok();
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                },
                signOff: function () {
                    AuthService.logout();
                }
            }
            // Login Event management
            $scope.$on('disc.login', function (event, actions) {
                $scope.actions.openSignIn(actions);
            })

            //--------- model initialization ------
            $scope.labels = {
                userSignIn: _getLabel('userSignIn'),
                userSignOff: _getLabel('userSignOff'),
                userProfile: _getLabel('userProfile')
            };
            // Authentication user data
            $scope.model = {
                nome: AuthService.user.username,
                isLogged: AuthService.user.isLogged
            }
            $scope.$watch(function () { return AuthService.user.isLogged; },
                function () {
                    $scope.model.nome = AuthService.user.username;
                    $scope.model.isLogged = AuthService.user.isLogged;
                }
            );
        }
    ]);
