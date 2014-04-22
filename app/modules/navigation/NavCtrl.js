angular.module("discitur")
    .controller('NavCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'DisciturBaseCtrl',
        '$injector',
        'DisciturSettings',
        function ($scope, $rootScope, $location, DisciturBaseCtrl, $injector, DisciturSettings) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'NavCtrl';

            $scope.labels = {
                brand: $scope.getLabel('brand')
            };
            
            $scope.local = {
                isInMaintenance: DisciturSettings.isInMaintenance
            }
            $scope.menu = [
                { id: 1, title: "Lezioni", route: "/lesson", state: "lessonSearch" },
                {
                    id: 2, title: "Il Progetto", route: "/project", state: "master.1cl.home", subMenu: [
                        { id: 21, title: "Il Manifesto", route: "/project/mission", state: "master.1cl.mission" },
                        { id: 23, title: "Contribuisci", route: "/project/contribute", state: "master.1cl.contribute" },
                        { id: 24, title: "BackStage", route: "/project/backstage", state: "master.1cl.backstage" },
                        { id: 22, title: "Chi siamo", route: "/project/About", state: "master.1cl.about" }
                    ]
                }/*,
                { id: 3, title: "Contatti", route: "/project/contact" }*/
            ]

            $scope.isActiveMenu = function(index){
                return ($location.path().indexOf($scope.menu[index].route) >= 0);
            }
            $scope.hasSubMenu = function (index) {
                return ($scope.menu[index].subMenu !== undefined && $scope.menu[index].subMenu.length>0);
            }

        }
    ]);
