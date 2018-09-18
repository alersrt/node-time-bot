const querystringify = require('querystringify');
const fetch = require('node-fetch');

/**
 * @constructor
 * @param apiKey API key at TimeZoneDB service.
 * @constructor
 */
function TimeZoneDB(apiKey) {
  if (apiKey) {
    this.apiKey = apiKey;
  } else {
    throw new Error('apiKey have to be set');
  }
  this.options = {
    url: 'http://api.timezonedb.com/',
    format: 'json',
    by: 'position',
  };
}

/**
 * @function
 * @param location this object has the next view: {latitude: <float>, longitude: <float>}
 */
TimeZoneDB.prototype.getTimeZone = function(location) {
  if (!location && (!location.latitude && !location.longitude)) {
    throw new Error('getTimeZone(): either location or latitude and longitude have to be set');
  }

  let requestParams = {
    key: this.apiKey,
    format: this.options.format,
    by: this.options.by,
    lat: location.latitude,
    lng: location.longitude,
  };

  return fetch(this.options.url + '?' + querystringify.stringify(requestParams)).then(response => response.json());
};

module.exports = function(apiKey) {
  return new TimeZoneDB(apiKey);
};