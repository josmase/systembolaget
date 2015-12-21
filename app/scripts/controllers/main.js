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


    $scope.alcohol = {
      min: "",
      max: ""
    };
    $scope.price = {
      min: "",
      max: ""
    };
    $scope.apk = {
      min: "",
      max: ""
    };

    // loadData();
    $scope.sort = "Name";
    $scope.predicate = 'name';
    $scope.reverse = true;
    $scope.order = function (predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    /**Gets data from xml file and puts it into $scope*/
    $scope.loadData = function() {
      $http.get('https://karlroos-systemet.p.mashape.com/product?' +
        'alcohol_from=' + ($scope.alcohol.min / 100) +
        '&alcohol_to=' + ($scope.alcohol.max / 100) +
        '&apk_from=' + $scope.apk.min +
        '&apk_to=' + $scope.apk.max +
        '&price_from=' + $scope.price.min +
        '&price_per_liter_from=0' +
        '&price_per_liter_to=900000' +
        '&price_to=' + $scope.price.max +
        '&limit=1000'
        , {
          headers: {'X-Mashape-Key': 'OZ9i1HXl2Hmshk5RuUK0N983D9GXp1MsAFnjsnpdlRfMKb7V6F', 'Accept': 'application/json'}
        }).success(function (data) {
        console.log(data);
        $scope.results = data.length;
        $scope.articles = data;
      })
    }

  }).filter('alcohol', function () {
    return function (input, object) {
      var filteredAmount = [];
      angular.forEach(input, function (item) {
        if (Math.floor(item.Alkoholhalt) <= (object.max || 0) &&
          Math.floor(item.Alkoholhalt) >= (object.min || 0)) {

          filteredAmount.push(item);
        }
      });

      return filteredAmount.length > 0 ? filteredAmount : [];
    };
  })
  .filter('priceMatch', function () {
    return function (input, object) {
      var filteredAmount = [];
      angular.forEach(input, function (item) {
        if (Math.floor(item.Prisinklmoms) <= (object.max || 0) &&
          Math.floor(item.Prisinklmoms) >= (object.min || 0)) {

          filteredAmount.push(item);
        }
      });

      return filteredAmount.length > 0 ? filteredAmount : [];
    };
  });
