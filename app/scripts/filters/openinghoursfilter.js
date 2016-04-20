'use strict';

/**
 * @ngdoc filter
 * @name systembolagetApp.filter:openingHoursFilter
 * @function
 * @description
 * # openingHoursFilter
 * Filter in the systembolagetApp.
 */
angular.module('systembolagetApp')
  .filter('openingHoursFilter', function () {
    return function (input, index) {
      var regex = /([0-9][^;]{9});([0-9].{4});([0-9].{4});;;(.[^;]*);/g;
      var matched;
      if (typeof index === 'number' && input !=null) {
        matched = matchAll(input, regex)[index];
        if (matched[4] === '-') {
           'Stängt'
        }
        else if (matched[4] == 0) {
          return matched[2] + " - " + matched[3];
        }
        return matched[4];
      }
    };
    function matchAll(input, regexp) {
      var matches = [];
      input.replace(regexp, function () {
        var arr = ([]).slice.call(arguments, 0);
        var extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
      });
      return matches.length ? matches : null;
    }


  });
