angular.module('disc.user')
    .controller('UserNavBar', [
        '$scope',
        'LabelService',
        '$state',
        '$modal',
        'CurrentUser',
        'UserService',
        function (
            $scope,
            LabelService,
            $state,
            $modal,
            CurrentUser,
            UserService
            ) {
            //-------- $scope properties ----
            $scope.labels;

            //-------- private method -------
            _getLabel = function (label) {
                return LabelService.get('UserNavBar', label);
            }
            //--------- model initialization ------
            $scope.labels = {
                userSignIn: _getLabel('userSignIn'),
                userSignOff: _getLabel('userSignOff'),
                userProfile: _getLabel('userProfile')
            };

            $scope.actions = {
                openSignIn : function () {
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
                },
                signOff: function () {
                    UserService.logout();
                }
            }

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

            $scope.signOff = function () {

            }

            

            $scope.model = {
                nome: UserService.currentUser.username,
                isLogged: UserService.currentUser.isLogged
            }
            $scope.$watch(function () { return UserService.currentUser.isLogged; },
                function () {
                    $scope.model.nome = UserService.currentUser.username;
                    $scope.model.isLogged = UserService.currentUser.isLogged;
                }
            );

            /*
            $scope.model = {
                nome: CurrentUser.username,
                isLogged: CurrentUser.isLogged
            }
            */
            //$scope.model.nome = CurrentUser.username;
            /*
            $scope.$watch(function () { return CurrentUser.isLogged; },
                function () {
                    $scope.model.nome = CurrentUser.username;
                    $scope.model.isLogged = CurrentUser.isLogged;
                }
            );
            */
        }
    ]);
