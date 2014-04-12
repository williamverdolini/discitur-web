angular.module('disc.common',
    [])
.filter('beautyURL', function () {
    var encodeURL = function (title) {
        return encodeURI(title.replace(/\s/g, '-'));
    }

    return encodeURL;
});