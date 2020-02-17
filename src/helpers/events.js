const events = require('events');
const { EVENTS_NAMES } = require('../data/constants');

const eventEmitter = new events.EventEmitter();

const getEventEmitter = () => eventEmitter;

const sendEvent = (eventName, eventData) => {
  eventEmitter.emit(eventName, eventData);
};

const init = (initData) => {
  sendEvent(EVENTS_NAMES.INITIALIZED, initData);
};

const warn = (warnData) => {
  sendEvent(EVENTS_NAMES.WARN, warnData);
};

const error = (errorData) => {
  sendEvent(EVENTS_NAMES.ERROR, errorData);
};

const pinging = (pingingData) => {
  sendEvent(EVENTS_NAMES.START_PINGING, pingingData);
};

const pinged = (pingedData) => {
  sendEvent(EVENTS_NAMES.PINGED, pingedData);
};

const pingedAll = (pingedAllData) => {
  sendEvent(EVENTS_NAMES.PINGED_ALL, pingedAllData);
};

const endedPinging = (endedPingingData) => {
  sendEvent(EVENTS_NAMES.ENDED_PINGING_INTERVAL, endedPingingData);
};

module.exports = {
  init, warn, error, pinging, pinged, pingedAll, endedPinging, sendEvent, getEventEmitter,
};
