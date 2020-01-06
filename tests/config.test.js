const config = require('../src/config');

describe('INDEX TEST', () => {
  it('has HerokuCaffeine app name', () => {
    expect(config.APP_NAME).toEqual('HerokuCaffeine');
  });

  it('has default config with empty urls list and interval set to 600', () => {
    expect(config.DEFAULT_HEROKU_CAFFEINE_CONFIG).toHaveProperty('interval', 1500000);
    expect(config.DEFAULT_HEROKU_CAFFEINE_CONFIG).toHaveProperty('urls', []);
    expect(config.DEFAULT_HEROKU_CAFFEINE_CONFIG).toHaveProperty('fetchOptions', {});
  });

  it('has fetch options with method GET, cors mode, no cache, omit credentials, false keepalive, redirect manual, no referrer and HerokuCaffeine origin header', () => {
    expect(config.FETCH_OPTIONS).toEqual({
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        origin: 'HerokuCaffeine',
      },
      keepalive: false,
      redirect: 'manual',
      referrer: 'no-referrer',
    });
  });
});
