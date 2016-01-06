(function(angular) {
    "use strict";
    angular.module('TestApp').factory('pin', ['$http', '$q', function($http, $q) {

        var Pin = function() {
            this.id = null;
            this.name = '';
            this.active = false;
            this.requesting = false;
            angular.extend(this, arguments[0]);
        };

        Pin.prototype.toggle = function() {
            var self = this;
            var url = '/pin/manage/:id'.replace(':id', self.id);
            var deferred = $q.defer();

            self.requesting = true;
            self.active = !self.active;
            $http.post(url, {active: self.active}).success(function (response) {
                
            }).error(function (response) {
                deferred.reject(response);
            })['finally'](function() {
                self.requesting = false;
            });

            return deferred.promise;
        };


        return Pin;
    }]);
})(angular);
