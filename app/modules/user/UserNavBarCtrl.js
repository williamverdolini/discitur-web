angular.module('disc.user')
    .controller('UserNavBar', [
        '$scope',
        '$state',
        '$modal',
        'AuthService',
        'DisciturBaseCtrl',
        '$injector',
        function ($scope, $state, $modal, AuthService, DisciturBaseCtrl, $injector) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'UserNavBar';
            var modalInstance;
            //-------- private methods -------

            //-------- public properties ----
            $scope.labels;
            $scope.actions;
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
                        if (actions && actions.ok)
                            actions.ok();
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                },
                signOff: function () {
                    AuthService.logout();
                },
                // search Lessons published by the User (for editing purposes)
                searchUserLessons: function () {
                    // set inherit option to false to avoid conflict with parameters in URL set by advancedSearch
                    $state.go('lessonSearch', { publishedBy: $scope.model.username }, { inherit: false });
                },
                userProfile: function () {
                    $state.go('userProfile', null, { inherit: false });
                }
            }
            // Login Event management
            $scope.$on('disc.login', function (event, actions) {
                $scope.actions.openSignIn(actions);
            })

            //--------- model initialization ------
            $scope.labels = {
                userSignIn: $scope.getLabel('userSignIn'),
                userSignOff: $scope.getLabel('userSignOff'),
                userProfile: $scope.getLabel('userProfile'),
                userLessons: $scope.getLabel('userLessons')
            };
            // Authentication user data
            $scope.model = {
                username: AuthService.user.username,
                isLogged: AuthService.user.isLogged
            }
            $scope.$watch(function () { return AuthService.user.isLogged; },
                function () {
                    $scope.model.username = AuthService.user.username;
                    $scope.model.isLogged = AuthService.user.isLogged;
                }
            );
        }
    ]);
