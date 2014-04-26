angular.module('disc.common')
    .directive('socialBar', [
        '$rootScope',
        'DisciturBaseCtrl',
        '$injector',
        function ($rootScope, DisciturBaseCtrl, $injector) {
            return {
                restrict: 'E',
                templateUrl: 'modules/common/socialBar.html',
                replace: true,
                transclude: false,
                scope: {
                    cssClass: '@?',
                    absUrl: '@?',
                    urlTitle: '@?',
                    hideFbLike: '@?',
                    hideGpOne: '@?'
                },
                link: function (scope, element, attrs) {
                    // inherit Discitur Base Controller
                    $injector.invoke(DisciturBaseCtrl, this, { $scope: scope });

                    //-------- private properties -------
                    scope._ctrl = 'socialBarDrv';

                    //-------- public properties-------
                    scope.local = {
                        cssClass: null,
                        absUrl: null,
                        urlTitle: null,
                        FBShareHref: null,
                        FBLikeHref: null,
                        TWShareHref: null,
                        GPOneHref: null,
                        GPShareHref: null,
                        LIShareHref: null,
                        showFBLike: angular.isDefined(scope.hideFbLike) ? false : true,
                        showGPone: angular.isDefined(scope.hideGpOne) ? false : true
                    }

                    scope.labels = {
                        socialTitleFBLike: scope.getLabel('socialTitleFBLike'),
                        socialTitleGPone: scope.getLabel('socialTitleGPone'),
                        socialTitleTWShare: scope.getLabel('socialTitleTWShare'),
                        socialTitleFBShare: scope.getLabel('socialTitleFBShare'),
                        socialTitleGPShare: scope.getLabel('socialTitleGPShare'),
                        socialTitleLIShare: scope.getLabel('socialTitleLIShare')
                    };
                    
                    //---------- Initialization --------------
                    scope.local.cssClass =  scope.cssClass || 'social-bar';
                    scope.local.absUrl= encodeURIComponent(angular.isDefined(attrs.absUrl) ? attrs.absUrl : scope.absUrl);
                    scope.local.urlTitle = encodeURIComponent(angular.isDefined(scope.urlTitle) ? scope.urlTitle : scope.absUrl);
                    scope.local.FBShareHref = "http://www.facebook.com/sharer.php?u=" + scope.local.absUrl + (scope.urlTitle ? "&t=" + scope.local.urlTitle : "");
                    scope.local.FBLikeHref= "http://www.facebook.com/plugins/like.php?href=" + scope.local.absUrl;
                    scope.local.TWShareHref = "http://twitter.com/share?url=" + scope.local.absUrl + (scope.urlTitle ? "&text=" + scope.local.urlTitle : "") + "&via=__wilver__";
                    scope.local.GPOneHref= "https://apis.google.com/_/+1/fastbutton?usegapi=1&size=large&url=" + scope.local.absUrl;
                    scope.local.GPShareHref= "https://plus.google.com/share?url=" + scope.local.absUrl;
                    scope.local.LIShareHref = "http://www.linkedin.com/shareArticle?url=" + scope.local.absUrl;                    
                }
            }
        }
    ])