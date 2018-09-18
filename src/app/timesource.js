const TIMEZONEDB_TOKEN = process.env.TIMEZONEDB_TOKEN;
const timezonedb = require('./external-api/timezonedb')(TIMEZONEDB_TOKEN);

/**
 * Returns timezone info.
 * @param location must contains two field: latitude and longitude.
 * @return {*}
 */
function getTimeinfo(location) {
  return timezonedb.getTimeZone(location);
}

module.exports.timeutil = {
  timeinfo: getTimeinfo,
};