const nativeEvents = require('events');
const events = require('../../src/helpers/events');
const { EVENTS_NAMES } = require('../../src/data/constants');

jest.mock('../../src/data/constants', () => ({
  EVENTS_NAMES: {
    INITIALIZED: 'init',
    START_PINGING: 'pinging',
    PINGED: 'pinged',
    PINGED_ALL: 'pingedall',
    ENDED_PINGING_INTERVAL: 'endedpinginginterval',
    ERROR: 'error',
    WARN: 'warning',
  },
}));

jest.mock('events');

describe('HELPERS: events', () => {
  const mockData = { some: 'mock', data: 'mock' };
  const mockEventEmitter = nativeEvents.EventEmitter.prototype.emit;

  it('sends init event', () => {
    events.init(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.INITIALIZED, mockData);
  });

  it('sends warn event', () => {
    events.warn(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.WARN, mockData);
  });

  it('sends pinging event', () => {
    events.pinging(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.START_PINGING, mockData);
  });

  it('sends pinged event', () => {
    events.pinged(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.PINGED, mockData);
  });

  it('sends pinged all events', () => {
    events.pingedAll(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.PINGED_ALL, mockData);
  });

  it('sends ended pinging (interval) event', () => {
    events.endedPinging(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.ENDED_PINGING_INTERVAL, mockData);
  });

  it('sends error event', () => {
    events.error(mockData);

    expect(mockEventEmitter).toHaveBeenCalledWith(EVENTS_NAMES.ERROR, mockData);
  });
});
