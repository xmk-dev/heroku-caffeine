const APP_NAME = 'HerokuCaffeine';

const DEFAULT_HEROKU_CAFFEINE_CONFIG = {
  interval: 1500000,
  urls: [],
  fetchOptions: {},
};

const FETCH_OPTIONS = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'omit',
  headers: {
    origin: APP_NAME,
  },
  keepalive: false,
  redirect: 'manual',
  referrer: 'no-referrer',
};

module.exports = { APP_NAME, DEFAULT_HEROKU_CAFFEINE_CONFIG, FETCH_OPTIONS };
