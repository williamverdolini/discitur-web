angular.module('disc.user')
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
    // Singleton to manage Current Authenticated User
    .factory('CurrentUser', [
        'UserDTO',
        //'UserService',
        function (UserDTO) {
            /*
            var _token = localStorage.getItem('disc.auth.token');
            var _cUser = {};

            if (_token) {
                UserService.getUserInfo().then(
                    function (successData) {
                        _cUser = successData;
                    },
                    function (errorData) {
                        // do something...
                    })
            }
            else {
                _cUser = angular.extend(new UserDTO(), { isLogged: false })
            }
            */
            // Current User is a special UserDTO with authenticaton properties
            var _cUser = angular.extend(new UserDTO(),{ isLogged: false })
            return _cUser;
        }
    ])
    // User Service
    .factory('UserService', [
        '$http',
        '$q',
        'CurrentUser',
        'DiscUtil',
        'DisciturSettings',
        'UserDTO',
        function ($http, $q, CurrentUser, DiscUtil, DisciturSettings, UserDTO) {
            var _token = localStorage.getItem('disc.auth.token');

            // data transfer mapping from Business Domain
            var _setCurrentUserData = function (apiData) {
                CurrentUser.username = apiData.UserName;
                CurrentUser.name = apiData.Name;
                CurrentUser.surname = apiData.Surname;
                CurrentUser.email = apiData.Email;
                return;
            }

            var _setUserData = function (apiData) {
                var _user = new UserDTO();
                _user.username = apiData.UserName;
                _user.name = apiData.Name;
                _user.surname = apiData.Surname;
                _user.email = apiData.Email;
                return _user;
            }
            // data transfer mapping from Authentication Domain (OAuth-AspNetUsers)
            var _setCurrentUserLoginData = function (apiData) {
                CurrentUser.username = apiData.userName;
                CurrentUser.isLogged = true;
                return;
            }

            var _setUserLoginData = function (apiData) {
                var _user = {};
                _user.username = apiData.UserName || apiData.userName;
                _user.isLogged = true;
                return _user;
            }


            var _setCurrentUserLoginOutData = function () {
                angular.extend(CurrentUser, new UserDTO());
                angular.extend(CurrentUser, { isLogged: false })
                return;
            }

            var _setUserLoginOutData = function () {
                var _user = {};
                angular.extend(_user, { isLogged: false })
                return _user;
            }


            /*
            var _setHeaders = function (token) {
                if (!token) {
                    delete $http.defaults.headers.common['X-Token'];
                    return;
                }
                $http.defaults.headers.common['X-Token'] = token.toString();
            };
            */

            var _setToken = function (token) {
                if (!token) {
                    localStorage.removeItem('disc.auth.token');
                } else {
                    localStorage.setItem('disc.auth.token', token);
                }
                //_setHeaders(token);
            };

            //-------- public methods-------

            var _authService = {
                currentUser : angular.extend(new UserDTO(), { isLogged: false }),
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
                                angular.extend(_authService.currentUser, _user);
                                _setToken(result.access_token);
                                deferred.resolve(_authService.currentUser);
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
                    // unload CurrentUser data
                    var _user = _setUserLoginOutData();
                    angular.extend(_authService.currentUser, _user);
                    deferred.resolve(_authService.currentUser)
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
                                angular.extend(_authService.currentUser, _user);
                                deferred.resolve(_authService.currentUser);
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


            if (_token) {
                _authService.getUserInfo().then(
                    function (successData) {
                        _authService.currentUser = successData;
                    },
                    function (errorData) {
                        // do something...
                    })
            }
            else {
                _cUser = angular.extend(new UserDTO(), { isLogged: false })
            }



            return _authService;

            /*
            return {
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
                                _setCurrentUserLoginData(result);
                                // Set Auth Token to send to server requests
                                _setToken(result.access_token);
                                deferred.resolve(CurrentUser);
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

                                //deferred.reject("no Valid Auth Parameters for username:" + inputParams.username);
                            });

                    return deferred.promise;
                },
                logout: function () {
                    DiscUtil.validateInput('UserService.logout', {}, arguments);
                    // create deferring result
                    var deferred = $q.defer();
                    // remove Auth Token
                    _setToken(null);
                    // unload CurrentUser data
                    _setCurrentUserLoginOutData();
                    deferred.resolve(CurrentUser)
                    return deferred.promise;
                }
            }
            */

        }
    ])
    // Authentication Intercepor
    .factory('UserAuthInterceptor', [
        '$q',
        function ($q) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    var _token = localStorage.getItem('disc.auth.token')
                    if (_token) {
                        config.headers.Authorization = 'Bearer ' + _token;
                        //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                    }
                    return config || $q.when(config);
                }
            }
        }
    ]);

//$httpProvider.interceptors.push('UserAuthInterceptor');
//Http Intercpetor to check auth failures for xhr requests
angular.module('disc.user').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('UserAuthInterceptor');
}]);