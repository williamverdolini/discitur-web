angular.module('Common')
        .factory('LabelService',
        [
            'dictionary',
            'overrides',
            function (dictionary, overrides) {
                //console.debug("factory: LabelService Creation");

                return {
                    get: function (controller, label) {
                        //console.debug("LabelService.get " + controller + " - " + label)
                        // if exists the overriden label within the Controller is returned 
                        // otherwise the dictionary's label is returned
                        return (overrides[controller] && overrides[controller][label]) ?
                            overrides[controller][label] :
                            dictionary[label] || 'Label (' + label + ') not set!';

                    }
                };
            }
        ]
);

