angular.module('disc.user')
    // Constructor to create User Object
    .factory('UserDTO', function () {
        function UserDTO() {
            this.userid = null;
            this.name = null;
            this.surname = null;
            this.username = null;
            this.image = null;
            this.thumb = null;
            this.email = null;
            this.roles = [];
            this.isLogged = null;
        }
        return (UserDTO);
    })
    // User Authentication Service
    .factory('AuthService', [
        '$http',
        '$q',
        'DiscUtil',
        'DisciturSettings',
        'UserDTO',
        'LabelService',
        '$fileUploader',
        function ($http, $q, DiscUtil, DisciturSettings, UserDTO, LabelService, $fileUploader) {
            //-------- private variables -------
            
            //-------- private methods -------

            // encode message with CriptoJS
            var _encode = function (message) {
                var key = CryptoJS.enc.Utf8.parse(DisciturSettings.criptoKey);
                var iv = CryptoJS.enc.Utf8.parse(DisciturSettings.criptoKey);
                var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), key,
                    {
                        keySize: 128 / 8,
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });

                return String(encrypted);
            }
            // decode message with CriptoJS
            var _decode = function (encryptedMessage) {
                //var key = CryptoJS.enc.Utf8.parse('7061737323313233');
                //var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
                var key = CryptoJS.enc.Utf8.parse(DisciturSettings.criptoKey);
                var iv = CryptoJS.enc.Utf8.parse(DisciturSettings.criptoKey);

                var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                
                return String(decrypted);
            }
            // User data transfer from API
            var _setUserData = function (apiData) {
                var _user = new UserDTO();
                _user.userid = apiData.UserId;
                _user.name = apiData.Name;
                _user.surname = apiData.Surname;
                _user.username = apiData.UserName || apiData.userName;
                _user.image = apiData.Picture;
                _user.thumb = apiData.Thumb || apiData.Picture;
                _user.email = apiData.Email;
                _user.isLogged = true;
                return _user;
            }
            // clear User information after Logout
            var _setUserLoginOutData = function () {
                var _user = new UserDTO();
                angular.extend(_user, { isLogged: false })
                return _user;
            }
            // store token in localStorage if passed, otherwise clear localStorage
            var _setToken = function (token) {
                if (!token) {
                    localStorage.removeItem(DisciturSettings.authToken);
                } else {
                    localStorage.setItem(DisciturSettings.authToken, token);
                }
            };
            // get token from server
            var _loadToken = function (inputParams) {
                DiscUtil.validateInput(
                    'UserService._loadToken',   // function name for logging purposes
                    {                          // hashmap to check inputParameters
                        username: null,
                        password: null
                    },
                    inputParams                 // actual input params
                );

                var encodedData = {
                    username: inputParams.username,
                    password: _encode(inputParams.password),
                    grant_type: 'password'
                }

                // create deferring result
                var deferred = $q.defer();

                $http.post(DisciturSettings.apiUrl + 'Token', $.param(encodedData))
                    .success(function (result) {
                        // Set Auth Token to send to server requests
                        if (result.access_token) {
                            _setToken(result.access_token);
                            deferred.resolve(result);
                        }
                        else {
                            var _authErr = {
                                code: result.error,
                                description: result.error_description,
                                status: status
                            }
                            deferred.reject(_authErr);
                        }
                    })
                    .error(function (error, status) {
                        var _authErr = LabelService.apiErrorCode(error.error);
                        /*
                        var _authErr = {
                            code: error.error || "invalid_grant",
                            description: error.error_description || "The user name or password is incorrect.",
                            status: status
                        }
                        */
                        deferred.reject(_authErr);
                    });


                return deferred.promise;

            };
            // mapping user to api
            var _userMap = function (user) {
                var data2api = {};
                data2api.UserId = user.userid;
                data2api.Name = user.name;
                data2api.Surname = user.surname;
                data2api.UserName = user.username;
                data2api.Email = user.email;
                return data2api;
            }

            var _authService = {
                //-------- public properties-------
                // User Object: injected in every controller needing authentication features
                user: angular.extend(new UserDTO(), { isLogged: false }),
                //-------- public methods-------
                // do Authentication and loads User information
                login: function (inputParams) {
                    DiscUtil.validateInput(
                        'UserService.login',   // function name for logging purposes
                        {                      // hashmap to check inputParameters
                            username: null,
                            password: null
                        },
                        inputParams            // actual input params
                    );

                    // create deferring result
                    var deferred = $q.defer();
                    // do server-side login and get authorization token
                    _loadToken(inputParams).then(
                        function () { //success
                            // get user Info to populate user object client-side
                            _authService.getUserInfo().then( 
                                            function (successData) {
                                                deferred.resolve(successData);
                                            },
                                            function (errorData) {
                                                deferred.reject(errorData);
                                            })
                        },
                        function (error, status) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                },
                // unload user information and become Anonymous
                logout: function () {
                    // No input validation needed
                    //DiscUtil.validateInput('UserService.logout', {}, {});
                    // create deferring result
                    var deferred = $q.defer();
                    // remove Auth Token
                    _setToken(null);
                    // unload current user data
                    var _user = _setUserLoginOutData();
                    //angular.extend(_authService.user, _user);
                    //angular.copy(_authService.user, {});
                    //angular.extend(_authService.user, _user);

                    angular.copy(_user, _authService.user);
                    deferred.resolve(_authService.user)
                    return deferred.promise;
                },
                // read and set user information on User Object
                getUserInfo: function () {
                    // No input validation needed
                    //DiscUtil.validateInput('UserService.getUserInfo', {}, {});
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data CurrentUser        
                    // For actual implementation of OAuth Middleware Provider, the parameters must be passed in querystring format
                    // http://stackoverflow.com/questions/19645171/how-do-you-set-katana-project-to-allow-token-requests-in-json-format
                    $http.get(DisciturSettings.apiUrl + 'Account/UserInfo')
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result, status) {
                                var _user = _setUserData(result);
                                //angular.extend(_authService.user, _user);
                                angular.copy(_user, _authService.user);

                                deferred.resolve(_authService.user);
                            })
                        .error(
                            // Error Callback
                            function (error, status) {
                                // remove Auth Token
                                _setToken(null);
                                // unload current user data
                                var _user = _setUserLoginOutData();
                                //angular.extend(_authService.user, _user);
                                angular.copy(_user, _authService.user);

                                var _authErr = {
                                    code: status,
                                    description: error.Message ? error.Message : error,
                                    status: status
                                }
                                deferred.reject(_authErr);
                            });
                    return deferred.promise;
                },
                // register user and get authorization token
                signup: function (inputParams) {
                    DiscUtil.validateInput(
                        'UserService.signup',   // function name for logging purposes
                        {                      // hashmap to check inputParameters
                            name: null,
                            surname: null,
                            email: null,
                            username:null,
                            password: null
                        },
                        inputParams            // actual input params
                    );

                    var deferred = $q.defer();
                    // encode password before sending to web api
                    var encodedInput = {};
                    angular.copy(inputParams, encodedInput);
                    encodedInput.password = _encode(inputParams.password);

                    $http.post(DisciturSettings.apiUrl + 'Account/Register', encodedInput)
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                // server-2-client mapping
                                var _user = _setUserData(result);
                                angular.copy(_user, _authService.user);
                                deferred.resolve(_authService.user);
                            })
                        .error(
                            // Error Callback
                            function (error, status) {
                                var _authErr = LabelService.apiError(error);
                                deferred.reject(_authErr);
                            });
                    return deferred.promise;
                },
                // initialize Authentication data
                resolveAuth: function () {
                    // create deferring result
                    var deferred = $q.defer();
                    // get security token from local storage
                    var _token = localStorage.getItem(DisciturSettings.authToken);
                    if (_token) {
                        _authService.getUserInfo().then(
                            function (user) { deferred.resolve(user); },
                            function (data) { deferred.reject(data); }
                            )
                    }
                    else
                        deferred.resolve(_authService.user);

                    return deferred.promise;
                },
                // retrieve password by Username
                retrievePassword: function (inputParams) {
                    DiscUtil.validateInput(
                        'UserService.retrievePassword', // function name for logging purposes
                        {                               // hashmap to check inputParameters
                            username: null
                        },
                        inputParams                     // actual input params
                    );

                    var deferred = $q.defer();
                    $http.get(DisciturSettings.apiUrl + 'Account/ResetPassword', { params: { UserName: inputParams.username } })
                        .success(
                            function (result, status) {
                                deferred.resolve(result);
                            })
                        .error(
                            function (error, status) {
                                var _authErr = {
                                    code: error.Message,
                                    description: error.ModelState[""][0],
                                    status: status
                                }
                                deferred.reject(_authErr);
                            });
                    return deferred.promise;
                },
                // changePassword
                changePassword: function (inputParams) {
                    DiscUtil.validateInput(
                        'UserService.changePassword',   // function name for logging purposes
                        {                               // hashmap to check inputParameters
                            password: null,
                            newPassword: null,
                            confirmPassword: null
                        },
                        inputParams                     // actual input params
                    );
                    // encode passwords before sending to web api
                    var encodedInput = {
                        OldPassword: _encode(inputParams.password),
                        NewPassword: _encode(inputParams.newPassword),
                        ConfirmPassword: _encode(inputParams.confirmPassword)
                    };

                    var deferred = $q.defer();
                    $http.post(DisciturSettings.apiUrl + 'Account/ChangePassword', encodedInput)
                        .success(
                            function (result, status) {
                                deferred.resolve(result);
                            })
                        .error(
                            function (error, status) {
                                var _authErr = {
                                    code: error.Message,
                                    description: error.ModelState[""][0],
                                    status: status
                                }
                                deferred.reject(_authErr);
                            });
                    return deferred.promise;

                },
                // Update user data
                update: function (user) {
                    DiscUtil.validateInput(
                        'UserService.update',       // function name for logging purposes
                        new UserDTO(),              // hashmap to check inputParameters e set default values
                        user                      // actual input params
                        );
                    // DTO mappint to API
                    var _user = _userMap(user);
                    // create deferring result
                    var deferred = $q.defer();
                    // Retrieve Async data for lesson id in input        
                    $http.put(DisciturSettings.apiUrl + 'User', _user)
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                var _user = _setUserData(result);
                                //angular.extend(_authService.user, _user);
                                angular.copy(_user, _authService.user);
                                deferred.resolve(_authService.user);
                            })
                        .error(
                            // Error Callback
                            function (data) {
                                deferred.reject("Error updating user id:" + user.id + " -> " + data);
                            });
                    // create deferring result
                    return deferred.promise;

                },
                // Activate user account
                activate: function (inputParams) {
                    DiscUtil.validateInput(
                        'UserService.activate',   // function name for logging purposes
                        {                         // hashmap to check inputParameters
                            username: null,
                            key: null
                        },
                        inputParams               // actual input params
                    );

                    var deferred = $q.defer();
                    $http.post(DisciturSettings.apiUrl + 'Account/Activate', inputParams)
                        .success(
                            function (result, status) {
                                deferred.resolve(result);
                            })
                        .error(
                            function (error, status) {
                                var _authErr = {
                                    code: error.Message,
                                    //description: error.ModelState[""][0],
                                    status: status
                                }
                                deferred.reject(_authErr);
                            });
                    return deferred.promise;

                },
                // check fo email existance (NOT USED)
                checkEmail: function (inputParams) {
                    DiscUtil.validateInput(
                        'UserService.checkEmail', // function name for logging purposes
                        {                         // hashmap to check inputParameters
                            email: null
                        },
                        inputParams               // actual input params
                    );

                    var deferred = $q.defer();
                    $http.get(DisciturSettings.apiUrl + 'User/anyEmail', { params: inputParams })
                        .success(
                            function (result, status) {
                                deferred.resolve(!(result=='true'));
                            })
                        .error(
                            function (error, status) {
                                deferred.resolve(false);
                            });
                    return deferred.promise;
                },
                // Update User Image
                updateUserImage: function (item) {
                    return $fileUploader.uploadItem(item);
                },
                // expose Authorizatin Token (BRUTTO!!)
                getTokenHeader: function () {
                    var _token = localStorage.getItem(DisciturSettings.authToken)
                    var res = {};
                    if (_token)
                        res = {
                            Authorization : 'Bearer ' + _token
                        }
                    return res;
                }
            }

            //-------- Singleton Initialization -------
            // get security token from local storage
            var _token = localStorage.getItem(DisciturSettings.authToken);
            if (_token) {
                _authService.getUserInfo();
            }


            return _authService;
        }
    ])
    // Authentication Intercepor:
    // set Header Authorization Token (if exists)
    .factory('UserAuthInterceptor', [
        '$q',
        'DisciturSettings',
        function ($q, DisciturSettings) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    var _token = localStorage.getItem(DisciturSettings.authToken)
                    if (_token) {
                        config.headers.Authorization = 'Bearer ' + _token;
                        //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                    }
                    return config || $q.when(config);
                }
            }
        }
    ]);
