'use strict';

describe('Service: storesService', function () {

  // load the service's module
  beforeEach(module('systembolagetApp'));

  // instantiate service
  var storesService;
  beforeEach(inject(function (_storesService_) {
    storesService = _storesService_;
  }));

  it('should do something', function () {
    expect(!!storesService).toBe(true);
  });

});
