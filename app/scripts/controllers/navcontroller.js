'use strict';

/**
 * @ngdoc function
 * @name systembolagetApp.controller:NavcontrollerCtrl
 * @description
 * # NavcontrollerCtrl
 * Controller of the systembolagetApp
 */
angular.module('systembolagetApp')
  .controller('NavcontrollerCtrl', function ($scope, storesService, geocodeService) {

    function nearestStore(stores) {
      var nearest = stores[0];
      stores.map(function (store) {
        if (store.distance < nearest) {
          nearest = store;
        }
      });

      $scope.store = nearest;
    }

    function calculateDistance(position, stores) {
      stores.forEach(function (store) {
        geocodeService.geocode(store)
          .then(function (storeLocation) {
            storeLocation = storeLocation.results[0].geometry.location;
            store.distance = geocodeService.getDistanceFromLatLon(position.coords, storeLocation);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
      nearestStore(stores);
    }

    function getStores() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          storesService.getStoresLatLon(position.coords,
            function (error) {
              console.log(error);
            })
            .then(function (stores) {
              calculateDistance(position, stores);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    }

    getStores();
  });
