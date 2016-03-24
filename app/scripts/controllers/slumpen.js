'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:SlumpenCtrl
 * @description
 * # SlumpenCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('SlumpenCtrl', function ($scope,getArticlesService) {
    $scope.price = {
        min: 0,
        max: 500,
        options: {
          floor: 0,
          ceil: 2000,
          step: 5,
          translate: function(value) {
            return value + 'Kr';
          }
        }
      };

    var setData = function (response) {
      console.log(response[1]);
      if($scope.article) $scope.article = null;
      var articleToUse = Math.floor((Math.random() * response.length));
        $scope.article = response[articleToUse];
      };

    $scope.loadData = function() {
      getArticlesService.getRandomArticle($scope.price).then(function (response) {
        console.log("asd");
        setData(response);
        }
      );
    };
    $scope.loadData();
  });
