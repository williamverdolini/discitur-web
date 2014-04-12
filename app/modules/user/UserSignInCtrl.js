angular.module('disc.user')
    .controller('UserSignInCtrl', [
        '$scope',
        '$modalInstance',
        'AuthService',
        'DisciturBaseCtrl',
        '$injector',
        function (
            $scope,
            $modalInstance,
            AuthService,
            DisciturBaseCtrl,
            $injector
            ) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'UserSignInCtrl';

            var _validationErrors = {
                message: '',
                init: function () { this.message = ''; },
                addMessage : function(message){
                    if (this.message != '') {
                        this.message += '<br\>';
                    }
                    this.message += message;
                }
            }

            //-------- public properties ----
            
            // Modal Dialog is inherited scope, so it's important to set internal object, 
            // otherwhise Javascript search properties in parent scope if not exists in this scope
            // very very very important for form validation!! (https://github.com/angular-ui/bootstrap/issues/969)
            $scope.local = {
                username: null,
                password: null,
                user: null,
                SUname: null,
                SUsurname: null,
                SUemail: null,
                SUusername: null,
                SUpassword: null,
                SUconfirmpassword: null,
                errors: {
                    show: false,
                    message: ''
                },
                SUerrors: {
                    show: false,
                    message: ''
                },
                showForgottedPwd: false,
                isCollapsed: true,
                usernamePwd: null,
                errorsPwd: {
                    show: false,
                    message: ''
                },
                sentNewPwd: {
                    show: false,
                    message: ''
                },
                SUSuccess: {
                    show: false
                }

            };

            $scope.labels = {
                username: $scope.getLabel('username'),
                password: $scope.getLabel('password'),
                forgottenPwdHelp: $scope.getLabel('forgottenPwdHelp'),
                sendMail: $scope.getLabel('sendMail'),
                signInTitle: $scope.getLabel('signInTitle'),
                login: $scope.getLabel('login'),
                register: $scope.getLabel('register'),
                loginButtom: $scope.getLabel('loginButtom'),
                passwordNotValid: $scope.getLabel('passwordNotValid'),
                name: $scope.getLabel('name'),
                surname: $scope.getLabel('surname'),
                email: $scope.getLabel('email'),
                confirmPassword: $scope.getLabel('confirmPassword'),
                signupButton: $scope.getLabel('signupButton'),
                requiredUserName: $scope.getLabel('requiredUserName'),
                minLengthUserName: $scope.getLabel('minLengthUserName'),
                requiredPassword: $scope.getLabel('requiredPassword'),
                minLengthPassword: $scope.getLabel('minLengthPassword'),
                requiredName: $scope.getLabel('requiredName'),
                requiredSurname: $scope.getLabel('requiredSurname'),
                requiredEmail: $scope.getLabel('requiredEmail'),
                validEmail: $scope.getLabel('validEmail'),
                serverValidationEmail: 'Esiste già un account associato a questo indirizzo email',
                requiredConfirmPassword: $scope.getLabel('requiredConfirmPassword'),
                minLengthConfirmPassword: $scope.getLabel('minLengthConfirmPassword'),
                matchConfirmPassword: $scope.getLabel('matchConfirmPassword'),
                forgottenPassword: $scope.getLabel('forgottenPassword'),
                signupSuccess: $scope.getLabel('signupSuccess'),
                sentNewPwdEmail: $scope.getLabel('sentNewPwdEmail')
            };

            //-------- private methods -------
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
                            $scope.local.errors.message += $scope.local.LoginForm.username.$error.required ? $scope.labels.requiredUserName : "";
                            $scope.local.errors.message += $scope.local.LoginForm.username.$error.minlength ? $scope.labels.minLengthUserName : "";
                            $scope.local.errors.show = true;
                        }
                        if ($scope.local.LoginForm.password.$invalid) {
                            $scope.local.errors.message = $scope.labels.minLengthPassword;
                            $scope.local.errors.show = true;
                        }

                    }
                },
                doLogout: function () {
                    AuthService.logout();
                },
                doSignup: function () {
                    if ($scope.local.SignupForm.$valid) {
                        $scope.local.SUerrors.show = false;
                        AuthService.signup(
                            {
                                name: $scope.local.SUname,
                                surname: $scope.local.SUsurname,
                                email: $scope.local.SUemail,
                                username: $scope.local.SUusername,
                                password: $scope.local.SUpassword
                            })
                        .then(
                            function (user) {
                                $scope.local.SUSuccess.show = true;
                            },
                            function (errors) {
                                _validationErrors.init();
                                for (var i = 0; i < errors.length; i++) {
                                    _validationErrors.addMessage(errors[i].description);
                                }
                                $scope.local.SUerrors.message = _validationErrors.message;
                                $scope.local.SUerrors.show = true;
                            }
                        );
                    }
                    else {
                        _validationErrors.init();
                        //_messages = '';
                        if ($scope.local.SignupForm.$invalid) {
                            if ($scope.local.SignupForm.name.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredName);
                            if ($scope.local.SignupForm.surname.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredSurname);
                            if ($scope.local.SignupForm.email.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredEmail);
                            else if ($scope.local.SignupForm.email.$error.email)
                                _validationErrors.addMessage($scope.labels.validEmail);
                            //else if ($scope.local.SignupForm.email.$error.serverCheck)
                            //    _validationErrors.addMessage($scope.labels.serverValidationEmail);
                            if ($scope.local.SignupForm.username.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredUserName);
                            else if ($scope.local.SignupForm.username.$error.minlength)
                                _validationErrors.addMessage($scope.labels.minLengthUserName);
                            if ($scope.local.SignupForm.password.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredPassword);
                            else if ($scope.local.SignupForm.password.$error.minlength)
                                _validationErrors.addMessage($scope.labels.minLengthPassword);
                            if ($scope.local.SignupForm.confirmPassword.$error.required)
                                _validationErrors.addMessage($scope.labels.requiredConfirmPassword);
                            else if ($scope.local.SignupForm.confirmPassword.$error.minlength)
                                _validationErrors.addMessage($scope.labels.minLengthConfirmPassword);
                            else if ($scope.local.SignupForm.confirmPassword.$error.pwmatch)
                                _validationErrors.addMessage($scope.labels.matchConfirmPassword);
                            //TODO: sistemare ed inserire direttive per robustezza pwd e conferma password, univocità username
                            // http://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password

                            $scope.local.SUerrors.message = _validationErrors.message;
                            $scope.local.SUerrors.show = true;
                        }

                    }
                },
                showRetrievePwd: function () {
                    $scope.local.showForgottedPwd = !$scope.local.showForgottedPwd;
                },
                retrievePassword: function () {
                    $scope.local.errorsPwd.show = false;
                    if ($scope.local.ForgottenPwd.$valid) {
                        AuthService.retrievePassword({ username: $scope.local.usernamePwd }).then(
                            function () {
                                $scope.local.sentNewPwd.message = ""
                                $scope.local.sentNewPwd.message += $scope.labels.sentNewPwdEmail;
                                $scope.local.sentNewPwd.show = true;
                            },
                            function (error) {
                                $scope.local.errorsPwd.message = ""
                                $scope.local.errorsPwd.message += error.description;
                                $scope.local.errorsPwd.show = true;
                            }
                            )
                    }
                    else {
                        $scope.local.errorsPwd.message = ""
                        $scope.local.errorsPwd.message += $scope.local.ForgottenPwd.username.$error.required ? $scope.labels.requiredUserName : "";
                        $scope.local.errorsPwd.message += $scope.local.ForgottenPwd.username.$error.minlength ? $scope.labels.minLengthUserName : "";
                        $scope.local.errorsPwd.show = true;
                    }
                },
                checkEmail: function (email) {
                    console.log("Controlla a server il valore:" + email);
                    return AuthService.checkEmail({ email: email });
                }
            }

        }
    ]);

