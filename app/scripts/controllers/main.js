'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('MainCtrl', function ($scope, getArticlesService) {
    $scope.search = {};
    $scope.sort = 'Name';
    $scope.predicate = 'apk';
    $scope.reverse = true;

    $scope.sliders = {
      price: {
        min: 0,
        max: 450,
        options: {
          floor: 0,
          ceil: 450
        }},
      alcohol: {
        min: 0,
        max: 100,
        options: {
          floor: 0,
          ceil: 100
        }},
      apk: {
        min: 0,
        max: 10,
        options: {
          floor: 0,
          ceil: 10
        }}
    };

    $scope.order = function (predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.loadData = function () {
      getArticlesService.getArticles($scope.search,$scope.sliders).then(function (response) {
          $scope.results = response.length;
          $scope.articles = response;
          $scope.articlesExists = response.length > 0;
        }
      );
    };
  });
