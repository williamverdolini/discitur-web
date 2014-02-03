angular.module('disc.user')
    .controller('UserSignInCtrl', [
        '$scope',
        '$modalInstance',
        'LabelService',
        'AuthService',
        function (
            $scope,
            $modalInstance,
            LabelService,
            AuthService
            ) {
            //-------- $scope properties ----
            $scope.labels;
            $scope.actions;
            $scope.local;

            //-------- private methods -------
            var _getLabel = function (label) {
                return LabelService.get('UserSignInCtrl', label);
            }
            var _validLoginCB = function (data) {
                $scope.local.user = data;
                $scope.actions.ok();
            };
            var _invalidLoginCB = function (error) {
                $scope.local.errors.message = error.description;
                $scope.local.errors.show = true;
            };

            //--------- public methods ------   
            $scope.actions = {
                ok: function () {
                    $modalInstance.close(0);
                },
                cancel: function () {
                    $modalInstance.dismiss('cancel');
                },
                doLogin: function () {
                    if ($scope.local.LoginForm.$valid) {
                        $scope.local.errors.show = false;
                        AuthService.login(
                            {
                                username: $scope.local.username,
                                password: $scope.local.password
                            })
                        .then(_validLoginCB, _invalidLoginCB);
                    }
                    else {
                        if ($scope.local.LoginForm.username.$invalid) {
                            $scope.local.errors.message = ""
                            $scope.local.errors.message += $scope.local.LoginForm.username.$error.required ? "UserName obbligatorio" : "";
                            $scope.local.errors.message += $scope.local.LoginForm.username.$error.minlength ? "Inserisci uno User Name di almeno 4 caratteri" : "";
                            //$scope.local.errors.message = _getLabel('usernameNotValid');
                            $scope.local.errors.show = true;
                        }
                        if ($scope.local.LoginForm.password.$invalid) {
                            $scope.local.errors.message = _getLabel('passwordNotValid');
                            $scope.local.errors.show = true;
                        }

                    }
                },
                doLogout: function () {
                    AuthService.logout();
                }
            }

            //--------- model initialization ------
            // Modal Dialog is inherited scope, so it's important to set internal object, 
            // otherwhise Javascript search properties in parent scope if not exists in this scope
            // very very very important for form validation!! (https://github.com/angular-ui/bootstrap/issues/969)
            $scope.local = {
                username: null,
                password: null,
                user: null,
                errors: {
                    show: false,
                    message: ''
                }
            };

            $scope.labels = {
                username: _getLabel('username'),
                password: _getLabel('password'),
                signInTitle: _getLabel('signInTitle'),
                login: _getLabel('login'),
                register : _getLabel('register'),
                loginButtom: _getLabel('loginButtom'),
            };
        }
    ]);

