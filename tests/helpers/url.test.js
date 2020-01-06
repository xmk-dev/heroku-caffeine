const { removeNotValidUrlsFromArray } = require('../../src/helpers/url');
const { MESSAGES } = require('../../src/data/constants');
const events = require('../../src/helpers/events');

jest.mock('../../src/data/constants', () => ({
  MESSAGES: {
    URLS_MUST_BE_AN_ARRAY: 'Urls list (of heroku apps) shloud be an array',
    WRONG_URL: 'This is wrong url and it will be removed: ',
  },
}));
jest.mock('../../src/helpers/events', () => ({
  error: jest.fn(),
  warn: jest.fn(),
}));

describe('HELPERS: url', () => {
  it('sends error event and returns empty array if the array is invalid', () => {
    expect(removeNotValidUrlsFromArray('test')).toEqual([]);
    expect(events.error).toHaveBeenCalledWith({ message: MESSAGES.URLS_MUST_BE_AN_ARRAY });
  });

  it('removes urls: https://google.com and https://fb.com and returns empty array', () => {
    const mockUrls = ['https://google.com', 'https://fb.com'];

    console.warn = jest.fn();
    expect(removeNotValidUrlsFromArray(mockUrls)).toEqual([]);

    expect(console.warn).toBeCalledTimes(2);
    expect(console.warn).toHaveBeenNthCalledWith(1, MESSAGES.WRONG_URL, mockUrls[0]);
    expect(console.warn).toHaveBeenNthCalledWith(2, MESSAGES.WRONG_URL, mockUrls[1]);

    expect(events.warn).toBeCalledTimes(2);
    expect(events.warn).toHaveBeenNthCalledWith(1, { message: MESSAGES.WRONG_URL, url: mockUrls[0] });
    expect(events.warn).toHaveBeenNthCalledWith(2, { message: MESSAGES.WRONG_URL, url: mockUrls[1] });
  });

  it('removes https://instagram.com and returns valid urls', () => {
    const mockValidUrls = ['https://b.herokuapp.com', 'https://c.herokuapp.com'];
    const mockUrls = ['https://a.com', ...mockValidUrls];

    expect(removeNotValidUrlsFromArray(mockUrls)).toEqual(mockValidUrls);
  });
});
