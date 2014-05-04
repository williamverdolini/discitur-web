angular.module('disc.user')
    .controller('UserImageCtrl', [
        '$scope',
        '$modalInstance',
        'AuthService',
        'DisciturBaseCtrl',
        '$injector',
        '$fileUploader',
        'DisciturSettings',
        function (
            $scope,
            $modalInstance,
            AuthService,
            DisciturBaseCtrl,
            $injector,
            $fileUploader,
            DisciturSettings
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'UserImageCtrl';

            //-------- public properties ----
            // Modal Dialog is inherited scope, so it's important to set internal object, 
            // otherwhise Javascript search properties in parent scope if not exists in this scope
            // very very very important for form validation!! (https://github.com/angular-ui/bootstrap/issues/969)
            $scope.local = {
                item: null
            };

            $scope.labels = {
                userImageTitle: $scope.getLabel('userImageTitle'),
                userImageChooseFile: $scope.getLabel('userImageChooseFile'),
                userImageUpload: $scope.getLabel('userImageUpload'),
                userImageCancel: $scope.getLabel('userImageCancel'),
                userImageName: $scope.getLabel('userImageName'),
                userImageSize: $scope.getLabel('userImageSize')
            };
            //-------- private methods -------

            //--------- public methods ------   
            $scope.actions = {
                ok: function () {
                    $modalInstance.close(0);
                },
                cancel: function () {
                    $modalInstance.dismiss('cancel');
                },
                clearQueue: function () {
                    uploader.clearQueue();
                    $scope.local.item = null;
                    console.log('uploader.clearQueue');
                }
            }


            // Creates a uploader
            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,
                url: DisciturSettings.apiUrl + 'User/Image',
                queueLimit: 1,
                formData: [{ UserId: AuthService.user.userid }],
                //removeAfterUpload: true,
                headers: AuthService.getTokenHeader()
            });

            // Images only
            uploader.filters.push(function (item /*{File|HTMLInputElement}*/) {
                var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
                type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            });

            // REGISTER HANDLERS
            uploader.bind('afteraddingfile', function (event, item) {
                $scope.local.item = uploader.queue[0];
                console.info('After adding a file', item);
            });

            uploader.bind('whenaddingfilefailed', function (event, item) {
                console.info('When adding a file failed', item);
            });

            uploader.bind('afteraddingall', function (event, items) {
                console.info('After adding all files', items);
            });

            uploader.bind('beforeupload', function (event, item) {
                console.info('Before upload', item);
            });

            uploader.bind('progress', function (event, item, progress) {
                console.info('Progress: ' + progress, item);
            });

            uploader.bind('success', function (event, xhr, item, response) {
                console.info('Success', xhr, item, response);
                $scope.local.item = null;
                AuthService.getUserInfo().then(function () {
                    $scope.actions.ok();
                })
            });

            uploader.bind('cancel', function (event, xhr, item) {
                console.info('Cancel', xhr, item);
            });

            uploader.bind('error', function (event, xhr, item, response) {
                console.info('Error', xhr, item, response);
            });

            uploader.bind('complete', function (event, xhr, item, response) {
                console.info('Complete', xhr, item, response);
            });

            uploader.bind('progressall', function (event, progress) {
                console.info('Total progress: ' + progress);
            });

            uploader.bind('completeall', function (event, items) {
                console.info('Complete all', items);
            });


        }
    ]);

