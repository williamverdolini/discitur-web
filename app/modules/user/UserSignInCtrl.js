angular.module('disc.user')
    .controller('UserSignInCtrl', [
        '$scope',
        '$modalInstance',
        'LabelService',
        'UserService',
        //'$state',
        function (
            $scope,
            $modalInstance,
            LabelService,
            UserService
            //$state
            ) {
            //--------- Controller private methods ------
            _getLabel = function (label) {
                return LabelService.get('UserSignInCtrl', label);
            }
            //--------- Controller public methods ------   
            $scope.ok = function () {
                $modalInstance.close(0);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            var _validLoginCB = function (data) {
                $scope.local.user = data;
                $scope.ok();
            };
            var _invalidLoginCB = function (error) {
                $scope.local.errors.message = error.description;
                $scope.local.errors.show = true;
                console.log(error)
            };

            $scope.doLogin = function () {
                if ($scope.local.LoginForm.$valid) {
                    $scope.local.errors.show = false;
                    UserService.login(
                        {
                            username: $scope.local.username,
                            password: $scope.local.password
                        })
                    .then(_validLoginCB, _invalidLoginCB);
                }

            };

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

