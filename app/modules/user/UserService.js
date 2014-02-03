﻿angular.module('disc.user')
    // Constructor to create User Object
    .factory('UserDTO', function () {
        function UserDTO() {
            this.name = null;
            this.surname = null;
            this.username = null;
            this.email = null;
            this.roles = [];
        }
        return (UserDTO);
    })
    // User Authentication Service
    .factory('AuthService', [
        '$http',
        '$q',
        //'CurrentUser',
        'DiscUtil',
        'DisciturSettings',
        'UserDTO',
        function ($http, $q, DiscUtil, DisciturSettings, UserDTO) {
            //-------- private methods -------
            var _setUserData = function (apiData) {
                var _user = new UserDTO();
                _user.username = apiData.UserName;
                _user.name = apiData.Name;
                _user.surname = apiData.Surname;
                _user.email = apiData.Email;
                return _user;
            }

            var _setUserLoginData = function (apiData) {
                var _user = {};
                _user.username = apiData.UserName || apiData.userName;
                _user.isLogged = true;
                return _user;
            }

            var _setUserLoginOutData = function () {
                var _user = {};
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

            var _authService = {
                //-------- public properties-------
                user: angular.extend(new UserDTO(), { isLogged: false }),
                //-------- public methods-------
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
                                var _user = _setUserLoginData(result);
                                // Set Auth Token to send to server requests
                                angular.extend(_authService.user, _user);
                                _setToken(result.access_token);
                                deferred.resolve(_authService.user);
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
                logout: function () {
                    DiscUtil.validateInput('UserService.logout', {}, arguments);
                    // create deferring result
                    var deferred = $q.defer();
                    // remove Auth Token
                    _setToken(null);
                    // unload current user data
                    var _user = _setUserLoginOutData();
                    angular.extend(_authService.user, _user);
                    deferred.resolve(_authService.user)
                    return deferred.promise;
                },
                getUserInfo: function () {
                    DiscUtil.validateInput('UserService.userInfo', {}, arguments);
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data CurrentUser        
                    // For actual implementation of OAuth Middleware Provider, the parameters must be passed in querystring format
                    // http://stackoverflow.com/questions/19645171/how-do-you-set-katana-project-to-allow-token-requests-in-json-format
                    $http.get(DisciturSettings.apiUrl + 'Account/UserInfo')
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                var _user = _setUserLoginData(result);
                                angular.extend(_authService.user, _user);
                                deferred.resolve(_authService.user);
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
                _authService.getUserInfo().then(
                    function (successData) {
                        _authService.user = successData;
                    },
                    function (errorData) {
                        // do something...
                    })
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
