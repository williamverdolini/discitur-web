angular.module('disc.user')
    // Constructor to create User Object
    .factory('UserDTO', function () {
        function UserDTO() {
            this.name = null;
            this.surname = null;
            this.username = null;
            this.image = null;
            this.email = null;
            this.roles = [];
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
        function ($http, $q, DiscUtil, DisciturSettings, UserDTO) {
            //-------- private methods -------
            var _setUserData = function (apiData) {
                var _user = new UserDTO();
                _user.userid = apiData.UserId;
                _user.name = apiData.Name;
                _user.surname = apiData.Surname;
                _user.username = apiData.UserName || apiData.userName;
                _user.image = apiData.Picture;
                _user.email = apiData.Email;
                _user.isLogged = true;
                return _user;
            }
            /*
            var _setUserLoginData = function (apiData) {
                var _user = {};
                _user.username = apiData.UserName || apiData.userName;
                _user.isLogged = true;
                return _user;
            }
            */

            var _setUserLoginOutData = function () {
                var _user = new UserDTO();
                angular.extend(_user, { isLogged: false })
                return _user;
            }

            var _setToken = function (token) {
                if (!token) {
                    localStorage.removeItem(DisciturSettings.authToken);
                } else {
                    localStorage.setItem(DisciturSettings.authToken, token);
                }
            };

            var _getUserInfo = function () {
                _authService.getUserInfo().then(
                    function (successData) {
                        _authService.user = successData;
                    },
                    function (errorData) {
                        // do something...
                    })
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

                    inputParams.grant_type = 'password';
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data CurrentUser        
                    // For actual implementation of OAuth Middleware Provider, the parameters must be passed in querystring format
                    // http://stackoverflow.com/questions/19645171/how-do-you-set-katana-project-to-allow-token-requests-in-json-format
                    $http.post(DisciturSettings.apiUrl + 'Token', $.param(inputParams))
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                // var _user = _setUserLoginData(result);
                                // Set Auth Token to send to server requests
                                if (result.access_token) {
                                    _setToken(result.access_token);
                                    // Get User Info (with auth token)
                                    _authService.getUserInfo().then(
                                            function (successData) {
                                                deferred.resolve(successData);
                                            },
                                            function (errorData) {
                                                deferred.reject(errorData);
                                            })
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
                        .error(
                            // Error Callback
                            function (error, status) {
                                var _authErr = {
                                    code: error.error,
                                    description: error.error_description,
                                    status: status
                                }
                                deferred.reject(_authErr);
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
                    angular.copy(_authService.user, {});
                    angular.extend(_authService.user, _user);
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
                                // I don't understand this...I should go on error callback...
                                if (status >= 200 && status < 300) {
                                    //var _user = _setUserLoginData(result);
                                    var _user = _setUserData(result);

                                    angular.extend(_authService.user, _user);
                                    deferred.resolve(_authService.user);
                                }
                                else {
                                    // remove Auth Token
                                    _setToken(null);
                                    // unload current user data
                                    var _user = _setUserLoginOutData();
                                    angular.extend(_authService.user, _user);

                                    var _authErr = {
                                        code: status,
                                        description: result,
                                        status: status
                                    }
                                    deferred.reject(_authErr);
                                }
                            })
                        .error(
                            // Error Callback
                            function (error, status) {
                                var _authErr = {
                                    code: error.error,
                                    description: error.error_description,
                                    status: status
                                }
                                deferred.reject(_authErr);
                            });

                    return deferred.promise;
                }
            }

            //-------- Singleton Initialization -------
            // get security token from local storage
            var _token = localStorage.getItem(DisciturSettings.authToken);
            if (_token) {
                _getUserInfo();
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
