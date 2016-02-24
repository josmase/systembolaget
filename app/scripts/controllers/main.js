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
  });
