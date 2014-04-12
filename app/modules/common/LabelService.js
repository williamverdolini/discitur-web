angular.module('disc.common')
    .factory('ErrorDTO', function () {
        function ErrorDTO() {
            this.code = null;
            this.description = null;
        }
        return (ErrorDTO);
    })
    .factory('LabelService',
    [
        'dictionary',
        'overrides',
        'errors',
        'ErrorDTO',
        function (dictionary, overrides, errors, ErrorDTO) {
            return {
                get: function (controller, label) {
                    //console.debug("LabelService.get " + controller + " - " + label)
                    // if exists the overriden label within the Controller is returned 
                    // otherwise the dictionary's label is returned
                    return (overrides[controller] && overrides[controller][label]) ?
                        overrides[controller][label] :
                        dictionary[label] || 'Label (' + label + ') not set!';

                },
                apiErrorCode: function (errorCode) {
                    var _err = new ErrorDTO();
                    _err.code = errorCode;
                    _err.description = errors[errorCode] || errorCode;
                    return _err;
                },
                apiError: function (apiError) {
                    var _errs = [];
                    if (apiError.ModelState && apiError.ModelState.discerrors) {
                        var _discerrors = apiError.ModelState.discerrors;
                        for (var i = 0; i < _discerrors.length; i++) {
                            var _err = new ErrorDTO();
                            _err.code = _discerrors[i];
                            _err.description = (errors[_discerrors[i]] ? errors[_discerrors[i]] : _discerrors[i]);
                            _errs.push(_err);
                        }
                    }
                    else {
                        var _err = new ErrorDTO();
                        _err.code = apiError;
                        _err.description = apiError;
                        _errs.push(_err);
                    }
                    return _errs;
                }
            };
        }
    ]
);

