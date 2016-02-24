'use strict';

/**
 * @ngdoc service
 * @name systembolagetApp.getArticles
 * @description
 * # getArticles
 * Service in the systembolagetApp.
 */
angular.module('systembolagetApp')
  .service('getArticlesService', function ($http) {

    this.getArticles = function (search) {
      this.search = search;
      this.search.alcoholMin = (search.alcoholMin || 0);
      this.search.alcoholMax = (search.alcoholMax || 100);
      this.search.apkMin = search.apkMin || 0;
      this.search.apkMax = search.apkMax || 100;
      this.search.priceMin = search.priceMin || 0;
      this.search.priceMax = search.priceMax || 99999;
      return $http({
        method: 'GET',
        url: 'https://karlroos-systemet.p.mashape.com/product',
        headers: {'X-Mashape-Key': 'OZ9i1HXl2Hmshk5RuUK0N983D9GXp1MsAFnjsnpdlRfMKb7V6F', 'Accept': 'application/json'},
        params: {
          ALCOHOL_FROM: (this.search.alcoholMin/100),
          ALCOHOL_TO: (this.search.alcoholMax/100),
          APK_FROM: this.search.apkMin,
          APK_TO: this.search.apkMax,
          PRICE_FROM: this.search.priceMin,
          PRICE_TO: this.search.priceMax,
          limit: 500
        }
      }).then(handleSuccess, handleError('Kunde inte nå servern'));
    };
    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }

  });

