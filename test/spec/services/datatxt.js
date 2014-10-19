'use strict';

describe('Service: datatxt', function () {

  // load the service's module
  beforeEach(module('classifierApp'));

  // instantiate service
  var datatxt;
  beforeEach(inject(function (_datatxt_) {
    datatxt = _datatxt_;
  }));

  it('should do something', function () {
    expect(!!datatxt).toBe(true);
  });

});
