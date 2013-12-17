var app = angular.module('Chess', ['ngRoute']);
//set up routes
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {templateUrl: 'templates/home.html'})
  .when("/about", {templateUrl: '/templates/about.html'})
  .when("/rules", {templateUrl: '/templates/rules.html'})
  .when("/play", {controller: 'play', templateUrl: '/templates/rules.html'})
  .otherwise({redirectTo: '/'});
});

// app.factory('gameConnector', function($q, $timeout, $rootScope) {

// });

//
// controllers:
//

// app.controller('home', function($scope, $http, $q) {
//   //do nothing
// });

