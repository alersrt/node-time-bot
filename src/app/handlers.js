const moment = require('moment-timezone');

const {repository} = require('./datasource');
const {timeutil} = require('./timesource');

/**
 * Returns current time for the user.
 * @param userId id of the user which tries to get his current time.
 * @return {Promise<string | never>}
 */
async function currentTimeHandler(userId) {
  let userInfo = await repository.findByUserId(userId);
  let timeInfo = !!userInfo ? await timeutil.timeinfo(userInfo.location) : null;
  let stringFormat = 'ddd D, HH:mm:ss z ([UTC]Z)';
  return moment().tz(!!timeInfo ? timeInfo.timezone : 'Etc/Greenwich').format(stringFormat);
}

/**
 * Stores user's location into repository.
 * @param userId user identifier.
 * @param location user location.
 * @return {Promise<any>}
 */
async function storeHandler(userId, location) {
  return await repository.save(userId, location);
}

module.exports.handler = {
  current: currentTimeHandler,
  store: storeHandler,
};