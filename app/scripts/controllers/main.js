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

      $http.get('https://karlroos-systemet.p.mashape.com/product?alcohol_from=0.4&alcohol_to=1&apk_from=0&apk_to=9000&price_from=0&price_per_liter_from=0&price_per_liter_to=900000&price_to=900000',
        {
          headers: {'X-Mashape-Key': 'OZ9i1HXl2Hmshk5RuUK0N983D9GXp1MsAFnjsnpdlRfMKb7V6F', 'Accept' : 'application/json' }
        })
      .
      success(function (data) {
        console.log(data);
        $scope.articles = data;
      })
    }

  }).filter('alcohol', function() {
  return function(input, object) {
    var filteredAmount = [];
    angular.forEach(input, function(item) {
      if (Math.floor(item.Alkoholhalt) <= (object.max || 0) &&
        Math.floor(item.Alkoholhalt) >= (object.min || 0)) {

        filteredAmount.push(item);
      }
    });

    return filteredAmount.length > 0 ? filteredAmount : [];
  };
})
  .filter('priceMatch', function() {
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
});
