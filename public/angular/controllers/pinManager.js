(function(angular) {
    "use strict";
    angular.module('TestApp').controller('PinManagerCtrl', ['$scope', '$http', 'pin', function($scope, $http, Pin) {

        $scope.orderProp = ['id', 'name'];
        $scope.pins = [];
        $scope.requesting = false;

        $scope.listPins = function() {
            $scope.pins = [1,2,3,4,5,6,7,8,9,10,11,12,13].map(function(id) {
                return new Pin({id: id});
            });
        };

        $scope.$on('$routeChangeSuccess', function(next, current) {
            $scope.listPins();
        });
        
        window.scope=$scope;
    }]);
})(angular);