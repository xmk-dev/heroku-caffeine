const HerokuCaffeine = require('../src/index');

describe('INDEX TEST', () => {
  it('exports HerokuCaffeine class', () => {
    expect(HerokuCaffeine.name).toEqual('HerokuCaffeine');
  });
});
