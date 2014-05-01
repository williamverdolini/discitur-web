angular.module('disc.user')
    .controller('UserProfileCtrl', [
        '$scope',
        'DisciturBaseCtrl',
        '$injector',
        'user',
        'AuthService',
        '$state',
        '$modal',
        function (
            $scope,
            DisciturBaseCtrl,
            $injector,
            user,
            AuthService,
            $state,
            $modal
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'UserProfileCtrl';
            //-------- private methods -------
            var _validationErrors = {
                message: '',
                init: function () { this.message = ''; },
                addMessage: function (message) {
                    if (this.message != '') {
                        this.message += '<br\>';
                    }
                    this.message += message;
                }
            }

            //$scope.options = {
            //    url: '//jquery-file-upload.appspot.com/'
            //};

            //--------- public properties ------
            $scope.labels = {
                //userName: $scope.getLabel('userName')
                email: $scope.getLabel('email'),
                changePassword: $scope.getLabel('changePassword'),
                currentPassword: $scope.getLabel('currentPassword'),
                newPassword: $scope.getLabel('newPassword'),
                confirmPassword: $scope.getLabel('confirmPassword'),
                requiredPassword: $scope.getLabel('requiredPassword'),
                minLengthPassword: $scope.getLabel('minLengthPassword'),
                requiredNewPassword: $scope.getLabel('requiredNewPassword'),
                minLengthNewPassword: $scope.getLabel('minLengthNewPassword'),
                requiredConfirmPassword: $scope.getLabel('requiredConfirmPassword'),
                minLengthConfirmPassword: $scope.getLabel('minLengthConfirmPassword'),
                matchConfirmPassword: $scope.getLabel('matchConfirmPassword'),
                changedPassword: $scope.getLabel('changedPassword'),
                confirm: $scope.getLabel('confirm'),
                modify: $scope.getLabel('modify')
            };

            $scope.local = {
                user: user,
                viewedUser : {
                    email : user.email
                },
                errors: {
                    show: false,
                    message:''
                },
                success: {
                    show: false,
                    message: ''
                },
                UpdateUser: {
                    errors: {
                        show: false,
                        message: ''
                    },
                    success: {
                        show: false,
                        message: ''
                    }
                }
            }

            var modalInstance;
            //-------- public methods -------
            $scope.actions = {
                changePassword: function () {
                    if ($scope.local.ChangePwdForm.$valid) {
                        $scope.local.errors.show = false;
                        $scope.local.success.show = false;
                        AuthService.changePassword(
                            {
                                password: $scope.local.currentPassword,
                                newPassword: $scope.local.newPassword,
                                confirmPassword: $scope.local.confirmPassword
                            })
                        .then(
                            function () {
                                _validationErrors.init();
                                $scope.local.currentPassword = "";
                                $scope.local.newPassword = "";
                                $scope.local.confirmPassword = "";
                                $scope.local.success.message = $scope.labels.changedPassword;
                                $scope.local.success.show = true;
                            },
                            function (error) {
                                _validationErrors.init();
                                _validationErrors.addMessage(error.description);
                                $scope.local.errors.message = _validationErrors.message;
                                $scope.local.errors.show = true;
                            }
                        );
                    }
                    else {
                        _validationErrors.init();
                        if ($scope.local.ChangePwdForm.$invalid) {
                            if ($scope.local.ChangePwdForm.password.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredPassword);
                            else if ($scope.local.ChangePwdForm.password.$error.minlength)
                                _validationErrors.addMessage($scope.labels.minLengthPassword);
                            if ($scope.local.ChangePwdForm.newPassword.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredNewPassword);
                            else if ($scope.local.ChangePwdForm.newPassword.$error.minlength)
                                _validationErrors.addMessage($scope.labels.minLengthNewPassword);
                            if ($scope.local.ChangePwdForm.confirmPassword.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredConfirmPassword);
                            else if ($scope.local.ChangePwdForm.confirmPassword.$error.minlength)
                                _validationErrors.addMessage($scope.labels.minLengthConfirmPassword);
                            else if ($scope.local.ChangePwdForm.confirmPassword.$error.pwmatch)
                                _validationErrors.addMessage($scope.labels.matchConfirmPassword);
                            $scope.local.errors.message = _validationErrors.message;
                            $scope.local.errors.show = true;
                        }
                    }

                },
                updateUser: function () {
                    if ($scope.local.UpdateUserForm.$valid) {
                        var updatedUser = {}
                        angular.copy(AuthService.user, updatedUser);
                        updatedUser.email = $scope.local.viewedUser.email;
                        AuthService.update(updatedUser).then(
                            function () {
                                $scope.local.UpdateUser.success.message = "Dati aggiornati con successo.";
                                $scope.local.UpdateUser.success.show = true;
                            },
                            function (error) {
                                $scope.local.UpdateUser.errors.message = error;
                                $scope.local.UpdateUser.errors.show = true;
                            });
                    }
                    else
                        alert("NON VALIDO")
                },
                changeImage: function () {
                    modalInstance = $modal.open({
                        backdrop: true,
                        //windowClass: 'modal-signin',
                        //template: '<div class="container"><div class="row"><img ng-src="{{local.user.image}}" alt="" class="img-rounded img-responsive" /></div><form name="ImgForm" novalidate><div class="form-group"><input type="file" id="ImageData" name="ImageData" onchange="angular.element(this).scope().setFiles(this)" /></div></form></div>',
                        //template: '<div class="row fileupload-buttonbar"><div class="col-md-12"><ng-upload-form url="//jquery-file-upload.appspot.com/" size-limit="10000000"></ng-upload-form></div></div>',
                        templateUrl: 'UserImage',
                        controller: 'UserImageCtrl'
                        //controller: function ($scope, $modalInstance, AuthService) {
                        //    var prevImage = AuthService.user.image;
                        //    $scope.local = {
                        //        user: AuthService.user
                        //    }
                        //    $scope.setFiles = function (element) {
                        //        scope.$apply(function (scope) {
                        //            console.log('files:', element.files);
                        //            // Turn the FileList object into an Array
                        //            scope.files = []
                        //            for (var i = 0; i < element.files.length; i++) {
                        //                scope.files.push(element.files[i])
                        //            }
                        //            //scope.progressVisible = false
                        //        });
                        //    };
                        //}
                    });

                    modalInstance.result.then(function (selectedItem) {
                        // login caller callback
                        //if (actions && actions.ok)
                        //    actions.ok();
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });

                }
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
