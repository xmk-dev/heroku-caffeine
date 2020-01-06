const fetch = require('node-fetch');
const events = require('../../src/helpers/events.js');
const { FETCH_OPTIONS } = require('../../src/config');
const { pingAllAppsFromUrls } = require('../../src/helpers/fetch');

jest.mock('node-fetch');
jest.mock('../../src/helpers/events.js');
jest.mock('../../src/config', () => ({ FETCH_OPTIONS: {} }));


describe('HELPERS: fetch', () => {
  const mockUrls = ['https://some.url.com', 'https://mock.url.com', 'https://tests.pl'];

  it('pings 3 apps from urls', async () => {
    await pingAllAppsFromUrls(mockUrls);

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(events.pinging).toHaveBeenCalledWith(mockUrls);
    expect(events.pingedAll).toHaveBeenCalledWith(mockUrls);
  });

  it('pings apps from url and skips null', async () => {
    const mockUrlInArray = [mockUrls[0]];

    await pingAllAppsFromUrls(mockUrlInArray, null);

    expect(fetch).toHaveBeenCalledWith(mockUrls[0], {});
    expect(events.pingedAll).toHaveBeenCalledWith(mockUrlInArray);
  });

  it('catches error and sends error event', async () => {
    const emptyUrls = [];
    events.pingedAll = jest.fn(() => { throw new Error('mock-test'); });

    try {
      await pingAllAppsFromUrls(emptyUrls);
    } catch (err) {
      expect(events.pingedAll).toHaveBeenCalledWith(emptyUrls);
      expect(events.error).toHaveBeenCalledWith(err);
    }
  });
});
