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
    function createPlayers() {
      for (var numberOfPlayers = 0, id = 0; numberOfPlayers < 4; numberOfPlayers++, id++) {
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
                ceil: 2000,
                step: 5,
                translate: function (value) {
                  return value + 'Kr';
                }
              }
            }
          }
        )
      }
    }

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
  });
