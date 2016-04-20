'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('MainCtrl', function ($scope, getArticlesService, $location) {
    $scope.search = {};
    $scope.sort = 'Name';
    $scope.predicate = 'apk';
    $scope.reverse = true;

    $scope.sliders = {
      price: {
        min: 0,
        max: 500,
        options: {
          floor: 0,
          ceil: 500,
          step: 1,
          hideLimitLabels: true,
          translate: function (value) {
            return value + 'Kr';
          }
        }
      },
      alcohol: {
        min: 0,
        max: 100,
        options: {
          floor: 0,
          ceil: 100,
          hideLimitLabels: true,
          translate: function (value) {
            return value + '%';
          }
        }
      },
      apk: {
        min: 0,
        max: 5,
        options: {
          floor: 0,
          ceil: 5,
          hideLimitLabels: true,
          precision: 2,
          step: 0.1
        }
      }
    };

    $scope.go = function (id, name) {
      $location.path('article/' + id + '/' + name);
    };

    $scope.order = function (predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    function setData(response) {
      $scope.results = response.length;
      if ($scope.backupApiUsed) {
        $scope.articlesBackup = response;
      }
      else {
        $scope.articles = response;
      }
      $scope.articlesExists = response.length > 0;
    }

    function loadData() {
      getArticlesService.getArticles($scope.search, $scope.sliders).then(function (response) {
          if (response.success === false) {
            getArticlesService.backupApi($scope.sliders).then(function (res) {
              $scope.backupApiUsed = true;
              setData(res);
            });
          }
          else {
            $scope.backupApiUsed = false;
            setData(response);
          }
        }
      );
    }

    

    loadData();
    
  });
