const constants = require('../../src/data/constants');

describe('DATA: constants', () => {
  it('has EVENTS_NAMES and MESSAGES', () => {
    expect(constants).toHaveProperty('EVENTS_NAMES', {
      INITIALIZED: 'init',
      START_PINGING: 'pinging',
      PINGED: 'pinged',
      PINGED_ALL: 'pingedall',
      ENDED_PINGING_INTERVAL: 'endedpinginginterval',
      ERROR: 'error',
      WARN: 'warning',
    });

    expect(constants).toHaveProperty('MESSAGES', {
      URLS_MUST_BE_AN_ARRAY: 'Urls list (of heroku apps) shloud be an array',
      INTERVAL_MUST_BE_A_NUMBER: 'Interval must be a number',
      WRONG_URL: 'This is wrong url and it will be removed: ',
    });
  });
});
