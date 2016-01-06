(function(angular) {
    "use strict";
    var app = angular.module('TestApp', ['ngRoute', 'LocalStorageModule']);
    
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: '/angular/views/loginForm.html',
            controller: 'LoginCtrl',
            activeTab: 'login'
        }).
        when('/logout', {
            templateUrl: '/angular/views/loginForm.html',
            controller: 'LoginCtrl',
            activeTab: 'logout'
        }).
        when('/pins', {
            templateUrl: '/angular/views/pinManager.html',
            controller: 'PinManagerCtrl',
            activeTab: 'pinManager'
        }).
        otherwise({
            templateUrl: '/angular/views/main.html',
            controller: 'MainCtrl',
            activeTab: 'main'
        });
    }]);

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }]);
    
    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

})(angular);
