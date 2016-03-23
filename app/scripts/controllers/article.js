'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('ArticleCtrl', function ($scope,getArticlesService,$location) {
    var articleId = $location.path().split("/")[2];
    getArticlesService.getArticle(articleId).then(function (response) {
        $scope.article = response[0];
      }
    );
  });
