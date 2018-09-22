const TIMEZONEDB_TOKEN = process.env.TIMEZONEDB_TOKEN;
const timezonedb = require('./external-api/timezonedb')(TIMEZONEDB_TOKEN);

/**
 * Returns timezone info.
 * @param location must contains two field: latitude and longitude.
 * @return {*}
 */
async function getTimeinfo(location) {
  let timezoneInfo = await timezonedb.getTimeZone(location);
  return {
    // "gmtOffset" contains offset from GMT in seconds.
    // In our case we need milliseconds.
    gmtOffset: timezoneInfo.gmtOffset * 1000,
    timezone: timezoneInfo.zoneName,
  };
}

module.exports.timeutil = {
  timeinfo: getTimeinfo,
};