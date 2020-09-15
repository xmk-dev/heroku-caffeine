const { MESSAGES } = require('../data/constants');
const events = require('./events');

const sendErrorAndReturnEmptyArray = () => {
  events.error({ message: MESSAGES.URLS_MUST_BE_AN_ARRAY });
  return [];
};

const warndAndSendEvent = (url) => {
  console.warn(MESSAGES.WRONG_URL, url);
  events.warn({ url, message: MESSAGES.WRONG_URL });
};

const getIsHerokuAppUrl = (url) => /^(http|https):\/\/.*\.herokuapp\.com$/.test(url);

const removeNotValidUrlsFromArray = (urls) => {
  if (!Array.isArray(urls)) { return sendErrorAndReturnEmptyArray(); }

  return urls.filter((url) => {
    const isHerokuAppUrl = getIsHerokuAppUrl(url);
    if (!isHerokuAppUrl) { warndAndSendEvent(url); }
    return isHerokuAppUrl;
  });
};


module.exports = { removeNotValidUrlsFromArray };
