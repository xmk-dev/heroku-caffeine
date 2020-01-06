const EVENTS_NAMES = {
  INITIALIZED: 'init',
  START_PINGING: 'pinging',
  PINGED: 'pinged',
  PINGED_ALL: 'pingedall',
  ENDED_PINGING_INTERVAL: 'endedpinginginterval',
  ERROR: 'error',
  WARN: 'warning',
};

const URLS_MUST_BE_AN_ARRAY = 'Urls list (of heroku apps) shloud be an array';
const INTERVAL_MUST_BE_A_NUMBER = 'Interval must be a number';
const WRONG_URL = 'This is wrong url and it will be removed: ';

const MESSAGES = { URLS_MUST_BE_AN_ARRAY, INTERVAL_MUST_BE_A_NUMBER, WRONG_URL };

module.exports = { EVENTS_NAMES, MESSAGES };
