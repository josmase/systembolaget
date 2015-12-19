'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('MainCtrl', function ($scope, $http) {

    loadData();

    /**Gets data from axml file and puts it into $scope*/
    function loadData() {
      $http.get("./scripts/controllers/articles.xml"
      ).
      success(function (data) {
        $scope.articles = x2js.xml_str2json(data);
        console.log($scope.articles);
      })
    }
  });
