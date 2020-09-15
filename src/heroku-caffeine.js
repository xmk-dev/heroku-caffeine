const { DEFAULT_HEROKU_CAFFEINE_CONFIG } = require('./config');
const { MESSAGES } = require('./data/constants');
const { removeNotValidUrlsFromArray } = require('./helpers/url');
const { pingAllAppsFromUrls } = require('./helpers/fetch');
const {
  endedPinging: sendEndedPingingIntervalEvent,
  error: sendErrorEvent,
  init: sendInitEvent,
  getEventEmitter,
} = require('./helpers/events');

class HerokuCaffeine {
  constructor({
    interval = DEFAULT_HEROKU_CAFFEINE_CONFIG.interval,
    urls = DEFAULT_HEROKU_CAFFEINE_CONFIG.urls,
    fetchOptions = DEFAULT_HEROKU_CAFFEINE_CONFIG.fetchOptions,
  }) {
    if (!interval || typeof interval !== 'number') throw Error(MESSAGES.INTERVAL_MUST_BE_A_NUMBER);
    if (!urls || !Array.isArray(urls)) throw Error(MESSAGES.URLS_MUST_BE_AN_ARRAY);

    this.interval = interval;
    this.urls = removeNotValidUrlsFromArray(urls);
    this.fetchOptions = fetchOptions;
    this.ids = [];
    this.eventBus = getEventEmitter();

    sendInitEvent(this);
  }

  async intervalMainFunction() {
    try {
      const result = await pingAllAppsFromUrls(this.urls, this.fetchOptions);
      sendEndedPingingIntervalEvent(result);
    } catch (err) {
      sendErrorEvent(err);
    }
  }

  run() {
    const id = setInterval(this.intervalMainFunction, this.interval);
    this.ids?.push?.(id);
  }

  stop() {
    this.ids.forEach((id) => {
      clearInterval(id);
    });

    this.ids = [];
  }
}

module.exports = HerokuCaffeine;
