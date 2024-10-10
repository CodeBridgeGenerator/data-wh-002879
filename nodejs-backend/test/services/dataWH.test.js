const assert = require('assert');
const app = require('../../src/app');

describe('\'dataWH\' service', () => {
  it('registered the service', () => {
    const service = app.service('dataWH');

    assert.ok(service, 'Registered the service (dataWH)');
  });
});
