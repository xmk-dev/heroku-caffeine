const fetch = require('node-fetch');
const events = require('./events');
const { FETCH_OPTIONS } = require('../config');

const pingAppFromUrl = (url, fetchOptions = {}) => {
  const promise = fetch(url, { ...FETCH_OPTIONS, ...fetchOptions });
  events.pinged(url);
  return promise;
};

const pingAllAppsFromUrls = async (urls, fetchOptions) => {
  events.pinging(urls);

  const pingRequests = [];

  urls.forEach((url) => {
    pingRequests.push(pingAppFromUrl(url, fetchOptions));
  });

  try {
    const result = await Promise.all(pingRequests);
    events.pingedAll(urls);
    return result;
  } catch (err) {
    events.error(err);
    throw err;
  }
};

module.exports = { pingAllAppsFromUrls };
