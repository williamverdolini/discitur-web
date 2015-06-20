angular.module('disc.common')
    .factory('CookieNotificationService', [
        'DisciturSettings',
        function (DisciturSettings) {
        return {
            acceptCookieNotification: function () {
                localStorage.setItem(DisciturSettings.cookieNotificationAcceptedKey, true);
            }

        }
    }]);

