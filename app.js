var wunderground_API_key = '0be7f48a4b3034e2';

var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/titleView.html',
            controller: 'titleCtrl'
        })
        .when('/home', {
            templateUrl: 'partials/homepageView.html'
        })
        .when('/test', {
            templateUrl: 'partials/testView.html'
        })
        .otherwise({redirectTo: '/'});
});


