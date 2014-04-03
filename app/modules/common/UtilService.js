angular.module('disc.common')
    .factory('DiscUtil', ['$cacheFactory', function ($cacheFactory) {
        var _getMessage = function (obj) {
            var _message = "";
            for (var key in obj) {
                if (obj[key].constructor === Object)
                    _message += _getMessage(obj[key])
                else
                    _message += key + ":" + obj[key] + " ";
            }
            return _message;
        }

        return {
            // validate service input
            validateInput: function (functionName, validInput, actualInput) {
                // accept only Object
                if (angular.isUndefined(actualInput) || !(Object.prototype.toString.call(actualInput) === '[object Object]'))
                    throw { code: 20001, message: 'invalid Input Type for ' + functionName + ' :' + _getMessage(actualInput) }
                if (angular.isDefined(actualInput)) {
                    // loop to check if input.properties (aka parametrs) are expected by the service validInput template
                    for (key in actualInput) {
                        // Angular private ($$) and Discitur private (_) are ignored
                        if (!(key.indexOf('$$') == 0 || key.indexOf('_') == 0) && !validInput.hasOwnProperty(key))
                            throw { code: 20002, message: 'invalid Input Parameter for ' + functionName + ' :' + _getMessage(actualInput) }
                        // If not passed in actualInput and if defined in validInput, set default value
                        //if (angular.isUndefined(actualInput[key]) && validInput[key] != null)
                        //    actualInput[key] = validInput[key];
                    }
                    // loop to set default values, if not set in actualInput
                    for (key in validInput) {
                        if ((angular.isUndefined(actualInput[key]) || actualInput[key] == null) && validInput[key] != null)
                            actualInput[key] = validInput[key];
                    }
                }

            },
            // cache manager
            cache: $cacheFactory('disciturCache')
        }

    }])
    // LoadingInterceptor Intercepor:
    // display/hide loading bar
    .factory('LoadingInterceptor', [
        '$q',
        '$rootScope',
        'DisciturSettings',
        function ($q, $rootScope, DisciturSettings) {
            return {
                request: function (config) {
                    if (config.url.indexOf(DisciturSettings.apiUrl) >= 0)
                        $rootScope.$loading = true;
                    return config || $q.when(config);
                },
                response: function (result) {
                    if (result.config.url.indexOf(DisciturSettings.apiUrl) >= 0)
                        $rootScope.$loading = false;
                    return result || $q.when(result);
                },
                responseError: function (result) {
                    if ($rootScope.$loading)
                        $rootScope.$loading = false;
                    return $q.reject(result);
                }
            }
        }
    ])

