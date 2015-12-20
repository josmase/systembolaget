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
    $scope.sort = "Namn";
    loadData();
    $scope.predicate = 'namn';
    $scope.reverse = true;
    $scope.order = function (predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
    /**Gets data from xml file and puts it into $scope*/
    function loadData() {
      $http.get("./scripts/controllers/sak.xml"
      ).
      success(function (data) {
        $scope.articles = x2js.xml_str2json(data);
        console.log($scope.articles);
      })
    }

  }).filter('priceMatch', function() {
  return function(input, object) {
    var filteredAmount = [];
    angular.forEach(input, function(item) {
      if (Math.floor(item.Prisinklmoms) <= (object.max || 0) &&
          Math.floor(item.Prisinklmoms) >= (object.min || 0)) {

        filteredAmount.push(item);
      }
    });

    return filteredAmount.length > 0 ? filteredAmount : [];
  };
});;
