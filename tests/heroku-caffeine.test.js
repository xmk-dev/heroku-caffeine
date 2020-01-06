const HerokuCaffeine = require('../src/heroku-caffeine');

const { DEFAULT_HEROKU_CAFFEINE_CONFIG } = require('../src/config');
const { MESSAGES } = require('../src/data/constants');
const { removeNotValidUrlsFromArray } = require('../src/helpers/url');
const { pingAllAppsFromUrls } = require('../src/helpers/fetch');
const {
  endedPinging: sendEndedPingingIntervalEvent,
  error: sendErrorEvent,
} = require('../src/helpers/events');

jest.mock('../src/config', () => ({
  DEFAULT_HEROKU_CAFFEINE_CONFIG: {
    interval: 600000,
    urls: [],
    fetchOptions: {},
  },
}));
jest.mock('../src/data/constants', () => ({
  MESSAGES: {
    INTERVAL_MUST_BE_A_NUMBER: 'interval-error-message-mock',
    URLS_MUST_BE_AN_ARRAY: 'urls-error-message-mock',
  },
}));
jest.mock('../src/helpers/url', () => ({ removeNotValidUrlsFromArray: jest.fn((urls) => urls) }));
jest.mock('../src/helpers/fetch', () => ({ pingAllAppsFromUrls: jest.fn(() => 'result') }));
jest.mock('../src/helpers/events', () => ({
  endedPinging: jest.fn(),
  error: jest.fn(),
  init: jest.fn(),
}));

describe('INDEX TEST', () => {
  const createClass = jest.fn((props) => new HerokuCaffeine(props));
  const mockProps = {
    interval: 100,
    urls: ['https://a.herokuapp.com', 'https://b.herokuapp.com'],
    fetchOptions: { some: 'option-mock' },
  };

  it('creates class with 100 ms interval, https://some.herokuapp.com in urls and some fetch option, and send init event with this object', () => {
    const herokuCaffeine = createClass(mockProps);

    expect(herokuCaffeine).toHaveProperty('urls', mockProps.urls);
    expect(herokuCaffeine).toHaveProperty('interval', mockProps.interval);
    expect(herokuCaffeine).toHaveProperty('fetchOptions', mockProps.fetchOptions);
  });

  it('throws error when interval is null or undefined', () => {
    try {
      createClass({ interval: null });
    } catch (err) {
      expect(err).toEqual(Error(MESSAGES.INTERVAL_MUST_BE_A_NUMBER));
    }
  });

  it('throws error when interval is not a number (string)', () => {
    try {
      createClass({ interval: 'test' });
    } catch (err) {
      expect(err).toEqual(Error(MESSAGES.INTERVAL_MUST_BE_A_NUMBER));
    }
  });

  it('throws error when urls array is null or undefined', () => {
    try {
      createClass({ urls: null });
    } catch (err) {
      expect(err).toEqual(Error(MESSAGES.URLS_MUST_BE_AN_ARRAY));
    }
  });

  it('throws error when urls array is not an array (but string)', () => {
    try {
      createClass({ urls: 'test' });
    } catch (err) {
      expect(err).toEqual(Error(MESSAGES.URLS_MUST_BE_AN_ARRAY));
    }
  });

  it('(run) sets interval with main interval function and 100ms interval', () => {
    global.setInterval = jest.fn();

    const herokuCaffeine = createClass(mockProps);
    herokuCaffeine.run();

    expect(global.setInterval).toHaveBeenCalledWith(herokuCaffeine.intervalMainFunction, mockProps.interval);
  });

  it('stops all running intervals', () => {
    global.clearInterval = jest.fn();
    const mockIds = ['a', 'b'];

    const herokuCaffeine = createClass(mockProps);
    herokuCaffeine.ids = mockIds;

    herokuCaffeine.stop();

    expect(global.clearInterval).toHaveBeenCalledTimes(2);
    expect(global.clearInterval).toHaveBeenNthCalledWith(1, mockIds[0]);
    expect(global.clearInterval).toHaveBeenNthCalledWith(2, mockIds[1]);
  });

  it('calls pingAllAppsFromUrls and sends result via sendEndedPingingIntervalEvent', async () => {
    const herokuCaffeine = createClass(mockProps);

    await herokuCaffeine.intervalMainFunction();

    expect(sendEndedPingingIntervalEvent).toHaveBeenCalledWith('result');
  });
});
