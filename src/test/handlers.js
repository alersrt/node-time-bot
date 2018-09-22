const {expect} = require('chai');
const proxyquire = require('proxyquire').noPreserveCache();

/**
 * Test cases for the
 */
describe('Unit tests for handlers module', () => {

  let mockedUserId = 1;
  let userInfo = {serId: 1, location: {}};
  let timeInfo;
  let datasourceStubs = {repository: {findByUserId: async (userId) => userId === mockedUserId ? userInfo : null}};
  let timesourceStubs = {
    timeutil: {timeinfo: async (location) => location === userInfo.location ? timeInfo : null},
    '@noCallThru': true,
  };
  let handler = proxyquire('../app/handlers', {'./timesource': timesourceStubs, './datasource': datasourceStubs});

  afterEach(() => {
    userInfo.location = {};
    timeInfo = undefined;
  });

  describe('Test handler for current time\'s request', () => {

    it('Should return New York\'s time', async () => {

      // New York's latitude and longitude.
      location = {
        latitude: 36.071261,
        longitude: -79.793827,
      };

      timeInfo = {
        'gmtOffset': -14400,
        'timezone': 'America\/New_York',
      };

      let result = await handler.handler.current(1);

      expect(result).to.include('EDT (UTC-04:00)');
    });

    it('Should return time at Greenwich', async () => {
      let result = await handler.handler.current(1);

      expect(result).to.include('GMT');
    });
  });
});
