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
    var articleId = $location.path().split('/')[2];
    getArticlesService.getArticle(articleId).then(function (response) {
        $scope.article = response[0];
        if($scope.article.Ekologisk){
          $scope.article.Ekologisk = 'Ja';
        }else{
          $scope.article.Ekologisk = 'Nej';
        }
      if($scope.article.Etiskt){
        $scope.article.Etiskt = 'Ja';
      }else{
        $scope.article.Etiskt = 'Nej';
      }
      if($scope.article.Koscher){
        $scope.article.Koscher = 'Ja';
      }else{
        $scope.article.Koscher = 'Nej';
      }
      }
    );
  });
