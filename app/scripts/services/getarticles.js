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

    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }

    this.getArticles = function (search, sliders) {
      this.search = search;
      this.sliders = sliders;
      return $http({
        method: 'GET',
        url: 'http://localhost:8000/api/products',
        headers: {'Accept': 'application/json'},
        params: {
          apkMin: (this.sliders.apk.min),
          apkMax: (this.sliders.apk.max),
          PrisinklmomsMin: (this.sliders.price.min),
          PrisinklmomsMax: (this.sliders.price.max),
          AlkoholhaltMin: (this.sliders.alcohol.min),
          AlkoholhaltMax: (this.sliders.alcohol.max),
          Namn: (this.search.name),
          Varugrupp: (this.search.category)

        }
      }).then(handleSuccess,handleError("kunde inte nå servern"));
    };

    this.backupApi = function (sliders) {
      return $http({
        method: 'GET',
        url: 'https://karlroos-systemet.p.mashape.com/product',
        headers: {'X-Mashape-Key': 'OZ9i1HXl2Hmshk5RuUK0N983D9GXp1MsAFnjsnpdlRfMKb7V6F', 'Accept': 'application/json'},
        params: {
          APK_FROM: (sliders.apk.min / 100),
          APK_TO: (sliders.apk.max / 100),
          PRICE_FROM: (sliders.price.min),
          PRICE_TO: (sliders.price.max),
          ALCOHOL_FROM: (sliders.alcohol.min),
          ALCOHOL_TO: (sliders.alcohol.max),
          limit: 500
        }
      }).then(handleSuccess, handleError('Kunde inte nå servern'));
    }
  });

