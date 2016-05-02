'use strict';

describe('Controller: NavcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('systembolagetApp'));

  var NavcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavcontrollerCtrl = $controller('NavcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
