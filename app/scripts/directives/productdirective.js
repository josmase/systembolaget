'use strict';

/**
 * @ngdoc directive
 * @name systembolagetApp.directive:productDirective
 * @description
 * # productDirective
 */
angular.module('systembolagetApp')
  .directive('productDirective', function ($document) {
    return {
      restrict: 'EA',
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // we want to insert custom content inside the directive
      link: function (scope) {
        var body = $document.find('body');
        scope.dialogStyle = {};
        scope.hideModal = function () {
          scope.show = false;
          body.toggleClass('disableScroll', scope.show);
        };
      },
      template: "<div class='ng-modal' ng-show='show'> <div class='ng-modal-overlay'> <div class='ng-modal-dialog' ng-style='dialogStyle'> <div class='ng-modal-close' ng-click='hideModal()'><img src='images/ic_close_white_24px.svg'/> </div> <div class='ng-modal-dialog-content' ng-transclude></div> </div></div> </div>"
    };
  });
