const moment = require('moment-timezone');

const {repository} = require('./datasource');
const {timeutil} = require('./timesource');

/**
 * Returns current time for the user.
 * @param userId id of the user which tries to get his current time.
 * @return {Promise<string | never>}
 */
function currentTimeHandler(userId) {
  return repository.findByUserId(userId)
      .then(value => !!value ? timeutil.timeinfo(value.location) : null)
      .then(info => {
        let stringFormat = 'ddd D, HH:mm:ss z ([UTC]Z)';
        // Use Greenwich time by default.
        return moment().tz(!!info ? info.timezone : 'Etc/Greenwich').format(stringFormat);
      });
}

/**
 * Stores user's location into repository.
 * @param userId user identifier.
 * @param location user location.
 * @return {Promise<any>}
 */
function storeHandler(userId, location) {
  return repository.save(userId, location);
}

module.exports.handler = {
  current: currentTimeHandler,
  store: storeHandler,
};