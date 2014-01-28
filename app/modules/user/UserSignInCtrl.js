angular.module('disc.user')
    .controller('UserSignInCtrl', [
        '$scope',
        '$modalInstance',
        'LabelService',
        //'$state',
        function (
            $scope,
            $modalInstance,
            LabelService//,
            //$state
            ) {
            //--------- Controller private methods ------
            _getLabel = function (label) {
                return LabelService.get('LessonAdvSearchCtrl', label);
            }
            //--------- Controller public methods ------   
            $scope.ok = function () {
                $modalInstance.close(0);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.doLogin = function () {

            };

            //--------- model initialization ------
            // Modal Dialog is inherited scope, so it's important to set internal object, 
            // otherwhise Javascript search properties in parent scope if not exists in this scope
            // very very very important for form validation!! (https://github.com/angular-ui/bootstrap/issues/969)
            $scope.local = {
                username: null,
                password: null,
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

