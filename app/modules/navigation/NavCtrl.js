angular.module("Discitur")
    .controller('NavCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'DisciturBaseCtrl',
        '$injector',
        function ($scope, $rootScope, $location, DisciturBaseCtrl, $injector) {
            // inherit Discitur Base Controller
            $injector.invoke(DisciturBaseCtrl, this, { $scope: $scope });

            //-------- private properties -------
            $scope._ctrl = 'NavCtrl';

            $scope.labels = {
                brand: $scope.getLabel('brand')
            };
            
            $scope.menu = [
                { id: 1, title: "Lezioni", route: "/lesson" },
                {
                    id: 2, title: "Il Progetto", route: "/project", subMenu: [
                        { id: 21, title: "Il Manifesto", route: "/project/mission" },
                        { id: 22, title: "Chi siamo", route: "/project/About" },
                        { id: 23, title: "Contribuisci", route: "/project/contribute" },
                        { id: 24, title: "BackStage", route: "/project/backstage" }
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
