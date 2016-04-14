'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:SlumpenCtrl
 * @description
 * # SlumpenCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('SlumpenCtrl', function ($scope, getArticlesService) {
    $scope.players = [];
    $scope.numberOfPlayers = {
      value: 1,
      options: {
        floor: 1,
        ceil: 10
      }
    };
    function createPlayers() {
      $scope.players = [];
      for (var numberOfPlayers = 0, id = 0; numberOfPlayers < $scope.numberOfPlayers.value; numberOfPlayers++, id++) {
        $scope.players.push(
          {
            id: id,
            article: null,
            name: null,
            plays: null,
            price: {
              min: 0,
              max: 500,
              options: {
                floor: 0,
                ceil: 500,
                step: 5,
                hideLimitLabels: true,
                translate: function (value) {
                  return value + 'Kr';
                }
              }
            }
          }
        )
      }
    }


    $scope.$watch('numberOfPlayers.value', function () {
      createPlayers()
    });

    var setData = function (response, playerId) {
      if ($scope.article) $scope.article = null;
      var articleToUse = Math.floor((Math.random() * response.length));
      $scope.players[playerId].article = response[articleToUse];
    };

    $scope.loadData = function (player) {
      getArticlesService.getRandomArticle(player).then(function (response) {
          console.log(player);
          setData(response, player.id);
        }
      );
    };

    $scope.loadAllPlayers = function () {
      $scope.players.forEach(function (player) {
        $scope.loadData(player);
      });
    };
    createPlayers();
  })
;
