angular.module('disc.user')
    .factory('UserDTO', function () {
        function UserDTO() {
            this.name = null;
            this.surname = null;
            this.username = null;
            this.email = null;
        }
        return (UserDTO);
    })
    // Singleton to manage Current Authenticated User
    .factory('CurrentUser', [
        'UserDTO',
        function (UserDTO) {
            var _cUser = angular.extend(new UserDTO(),{ isLogged: false })
            return (_cUser);
        }    
    ])
    // User Service
    .factory('UserService', [
        '$http',
        '$q',
        'CurrentUser',
        'DiscUtil',
        function ($http, $q, CurrentUser, DiscUtil) {
            // data transfer mapping
            var _loadUserData = function(apiData){
                CurrentUser.username = apiData.UserName;
                CurrentUser.name = apiData.Name;
                CurrentUser.surname = apiData.Surname;
                CurrentUser.email = apiData.Email;
                return CurrentUser;
            }

            //-------- public methods-------
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
                    // create deferring result
                    var deferred = $q.defer();

                    // Retrieve Async data CurrentUser        
                    $http.post(DisciturSettings.apiUrl + 'user/login', inputParams)
                        .success(
                            // Success Callback: Data Transfer Object Creation
                            function (result) {
                                deferred.resolve(_loadUserData(result));
                            })
                        .error(
                            // Error Callback
                            function () {
                                deferred.reject("no Valid Auth Parameters for username:" + inputParams.username);
                            });

                    return deferred.promise;
                }
            }
        }
    ])
