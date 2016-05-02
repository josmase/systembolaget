'use strict';

/**
 * @ngdoc overview
 * @name systembolagetApp
 * @description
 * # systembolagetApp
 *
 * Main module of the application.
 */
angular
  .module('systembolagetApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
    'rzModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/slumpen', {
        templateUrl: 'views/slumpen.html',
        controller: 'SlumpenCtrl',
        controllerAs: 'slumpen'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
