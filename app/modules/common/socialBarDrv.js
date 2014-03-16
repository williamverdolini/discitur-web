angular.module('Common')
    .directive('socialBar', [
        '$rootScope',
        //'LabelService',
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
                    absUrl: '@',
                    urlTitle: '@?'
                },
                link: function (scope, element, attrs) {
                    // inherit Discitur Base Controller
                    $injector.invoke(DisciturBaseCtrl, this, { $scope: scope });

                    //-------- private properties -------
                    scope._ctrl = 'socialBarDrv';



                    //-------- private methods-------
                    // call Label Service to get dynamic labels
                    /*
                    var _getLabel = function (label) {
                        return LabelService.get('LessonRatingDrv', label);
                    }
                    var _initVal = scope.wrText;
                    */

                    //-------- private variables-------
                    //var form = element.find('form');

                    //-------- public properties-------
                    scope.local = {
                        /*
                        cssClass: scope.cssClass || 'social-bar',
                        absUrl: encodeURIComponent(scope.absUrl),
                        urlTitle: scope.urlTitle,
                        FBShareHref: "http://www.facebook.com/sharer.php?u=" + scope.local.absUrl + (urlTitle ? "&t=" + scope.local.urlTitle : ""),
                        FBLikeHref: "http://www.facebook.com/plugins/like.php?href=" + scope.local.absUrl,
                        TWShareHref: "http://twitter.com/share?url=" + scope.local.absUrl + (urlTitle ? "&text=" + scope.local.urlTitle : "") + "&via=__wilver__",
                        GPOneHref: "https://apis.google.com/_/+1/fastbutton?usegapi=1&size=large&url=" + scope.local.absUrl,
                        GPShareHref: "https://plus.google.com/share?url=" + scope.local.absUrl,
                        LIShareHref: "http://www.linkedin.com/shareArticle?url=" + scope.local.absUrl
                        */
                        cssClass: null,
                        absUrl: null,
                        urlTitle: null,
                        FBShareHref: null,
                        FBLikeHref: null,
                        TWShareHref: null,
                        GPOneHref: null,
                        GPShareHref: null,
                        LIShareHref: null
                        
                    }

                    scope.labels = {
                        socialTitleFBLike: scope.getLabel('socialTitleFBLike'),
                        socialTitleGPone: scope.getLabel('socialTitleGPone'),
                        socialTitleTWShare: scope.getLabel('socialTitleTWShare'),
                        socialTitleFBShare: scope.getLabel('socialTitleFBShare'),
                        socialTitleGPShare: scope.getLabel('socialTitleGPShare'),
                        socialTitleLIShare: scope.getLabel('socialTitleLIShare')//,
                        //deleteTooltip: _getLabel('deleteTooltip')
                    };
                    
                    //---------- Initialization --------------
                    scope.local.cssClass =  scope.cssClass || 'social-bar';
                    scope.local.absUrl= encodeURIComponent(scope.absUrl);
                    scope.local.urlTitle = encodeURIComponent(scope.urlTitle);
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