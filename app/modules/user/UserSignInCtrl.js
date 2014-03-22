angular.module('disc.user')
    .controller('UserSignInCtrl', [
        '$scope',
        '$modalInstance',
        //'LabelService',
        'AuthService',
        'DisciturBaseCtrl',
        '$injector',
        function (
            $scope,
            $modalInstance,
            //LabelService,
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
                SUname : null,
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
                }
            };

            $scope.labels = {
                username: $scope.getLabel('username'),
                password: $scope.getLabel('password'),
                signInTitle: $scope.getLabel('signInTitle'),
                login: $scope.getLabel('login'),
                register: $scope.getLabel('register'),
                loginButtom: $scope.getLabel('loginButtom'),
                passwordNotValid: $scope.getLabel('passwordNotValid'),
                name: $scope.getLabel('name'),
                surname: $scope.getLabel('surname'),
                email: $scope.getLabel('email'),
                username: $scope.getLabel('username'),
                password: $scope.getLabel('password'),
                confirmPassword: $scope.getLabel('confirmPassword'),
                signupButton: $scope.getLabel('signupButton'),
            };



            //-------- private methods -------
            /*
            var _getLabel = function (label) {
                return LabelService.get('UserSignInCtrl', label);
            }
            */
            var _validLoginCB = function (data) {
                $scope.local.user = data;
                $scope.actions.ok();
            };
            var _invalidLoginCB = function (error) {
                $scope.local.errors.message = error.description;
                $scope.local.errors.show = true;
            };
            var _validSignupCB = function () { }
            var _invalidSignupCB = function() {}

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
                            $scope.local.errors.message = $scope.labels.passwordNotValid;
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
                            _validLoginCB,
                            function (error) {
                                _validationErrors.init();
                                _validationErrors.addMessage("Comferma Password obbligatoria");
                            }
                        );
                    }
                    else {
                        _validationErrors.init();
                        //_messages = '';
                        if ($scope.local.SignupForm.$invalid) {
                            if ($scope.local.SignupForm.name.$error.required)
                                _validationErrors.addMessage("Nome obbligatorio");
                            if ($scope.local.SignupForm.surname.$error.required)
                                _validationErrors.addMessage("Cognome obbligatorio");
                            if ($scope.local.SignupForm.email.$error.required)
                                _validationErrors.addMessage("Email obbligatoria");
                            if ($scope.local.SignupForm.email.$error.email)
                                _validationErrors.addMessage("Email non valida");
                            if ($scope.local.SignupForm.username.$error.required)
                                _validationErrors.addMessage("UserName obbligatorio");
                            if ($scope.local.SignupForm.username.$error.minlength)
                                _validationErrors.addMessage("Inserisci uno User Name di almeno 4 caratteri");
                            if ($scope.local.SignupForm.password.$error.required)
                                _validationErrors.addMessage("Password obbligatoria");
                            if ($scope.local.SignupForm.confirmPassword.$error.required)
                                _validationErrors.addMessage("Comferma Password obbligatoria");
                            //TODO: sistemare ed inserire direttive per robustezza pwd e conferma password, univocità username
                            // http://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password
                            // http://blog.brunoscopelliti.com/form-validation-the-angularjs-way

                            $scope.local.SUerrors.message = _validationErrors.message;
                            $scope.local.SUerrors.show = true;
                        }

                    }
                }
            }

        }
    ]);

