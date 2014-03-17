angular.module("Discitur")
    .controller('NavCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'LabelService',
        function ($scope, $rootScope, $location) {
            /***** label initialization ****/
            /*
            _getLabel = function (label) {
                return LabelService.get('LessonCtrl', label);
            }

            $scope.labels = {
                specifics: _getLabel('specifics'),
                discipline: _getLabel('discipline'),
                school: _getLabel('school'),
                classroom: _getLabel('classroom'),
                rating: _getLabel('rating'),
                content: _getLabel('content'),
                lessonGoods: _getLabel('lessonGoods'),
                lessonBads: _getLabel('lessonBads'),
                conclusion: _getLabel('conclusion')
            };
            */
            $scope.menu = [
                { id: 1, title: "Lezioni", route: "/lesson" },
                {
                    id: 2, title: "Il Progetto", route: "/project", subMenu: [
                        { id: 21, title: "Il Manifesto", route: "/project/mission" },
                        { id: 22, title: "Chi siamo", route: "/project/About" },
                        { id: 23, title: "Contribuisci", route: "/project/contribute" },
                        { id: 24, title: "BackStage", route: "/project/backstage" }
                    ]
                },
                { id: 3, title: "Contatti", route: "/project/contact" }
            ]

            $scope.isActiveMenu = function(index){
                return ($location.path().indexOf($scope.menu[index].route) >= 0);
            }
            $scope.hasSubMenu = function (index) {
                return ($scope.menu[index].subMenu !== undefined && $scope.menu[index].subMenu.length>0);
            }

        }
    ]);
