angular.module('disc.lesson')
    .controller('Lesson404Ctrl', [
        '$scope',
        'DisciturBaseCtrl',
        '$injector',
        'DisciturSettings',
        function (
            $scope,
            DisciturBaseCtrl,
            $injector,
            DisciturSettings) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'Lesson404Ctrl';

            $scope.labels = {
                noLessonIdFound: $scope.getLabel('noLessonIdFound', DisciturSettings.supportEmail)
            };
            
        }
    ]);