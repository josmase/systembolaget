'use strict';

/**
 * @ngdoc service
 * @name systembolagetApp.storesService
 * @description
 * # storesService
 * Service in the systembolagetApp.
 */
angular.module('systembolagetApp')
  .service('storesService', function ($http) {
      var server = 'http://localhost:8000/api/';
      var functions = {};

      function handleSuccess(result) {
        return result.data;
      }

      function handleError(error) {
        return {success: false, error: error};
      }

      function getStoresLatLon(position) {
        console.log(position);
        return $http({
          method: 'GET',
          url: server + 'stores',
          headers: {'Accept': 'application/json'},
          params: {
            lat: position.latitude, lon: position.longitude
          }
        }).then(handleSuccess, handleError('kunde inte nå servern'));
      }

      functions.getStoresLatLon = getStoresLatLon;
      return functions;
    }
  );
