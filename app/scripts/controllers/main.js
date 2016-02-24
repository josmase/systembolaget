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

    $scope.order = function (predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.loadData = function () {

      getArticlesService.getArticles($scope.search).then(function (response) {
          console.log('apa');
          $scope.results = 'Din sökning gav ' + response.length + ' resultat';
          $scope.articles = response;
        }
      )
    };

  })
  .filter('alcohol', function () {
    return function (input, object) {
      var filteredAmount = [];
      angular.forEach(input, function (item) {
        if (Math.floor(item.Alkoholhalt) <= (object.max || 0) &&
          Math.floor(item.Alkoholhalt) >= (object.min || 0)) {

          filteredAmount.push(item);
        }
      });

      return filteredAmount.length > 0 ? filteredAmount : [];
    };
  })
  .filter('priceMatch', function () {
    return function (input, object) {
      var filteredAmount = [];
      angular.forEach(input, function (item) {
        if (Math.floor(item.Prisinklmoms) <= (object.max || 0) &&
          Math.floor(item.Prisinklmoms) >= (object.min || 0)) {

          filteredAmount.push(item);
        }
      });

      return filteredAmount.length > 0 ? filteredAmount : [];
    };
  });
