'use strict';

/**
 * @ngdoc service
 * @name systembolagetApp.geocodeService
 * @description
 * # geocodeService
 * Service in the systembolagetApp.
 */
angular.module('systembolagetApp')
  .service('geocodeService', function ($http) {

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }

    var functions = {};

    function geocode(store) {
      var address = store.Address1;
      var city = store.Address4;
      return $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        dataType: 'json',
        params: {
          address: city + ',' + address,
          key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk'
        }
      }).then(handleSuccess, handleError('kunde inte nå servern'));
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    function getDistanceFromLatLon(location1, location2) {
      var lat1 = location1.latitude;
      var lon1 = location1.longitude;
      var lat2 = location2.lat;
      var lon2 = location2.lng;

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.floor(R * c * 1000); // Distance in m

    }

    functions.getDistanceFromLatLon = getDistanceFromLatLon;
    functions.geocode = geocode;
    return functions;
  });

