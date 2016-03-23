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
          ceil: 450,
          translate: function(value) {
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
          translate: function(value) {
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
          precision: 2,
          step: 0.1
        }
      }
    };

    $scope.order = function (predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    var setData = function (response) {
      $scope.results = response.length;
      if($scope.backupApiUsed){
        $scope.articlesBackup = response;
      }
      else{
        $scope.articles = response;
      }
      $scope.articlesExists = response.length > 0;
    };
    
    $scope.loadData = function () {
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
    };
  });
