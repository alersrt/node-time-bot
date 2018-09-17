const {repository} = require('./datasource');

/**
 * Return help message.
 * @returns {string}
 */
function helpHandler() {
  return 'It is a time-utility bot. You can to specify your location for this bot and link your time via short command';
}

/**
 * Returns current time for the user.
 * @param userId id of the user which tries to get his current time.
 * @return {string}
 */
function currentTimeHandler(userId) {
  let record = repository.findByUserId(userId);
  let now;
  if (!!record) {
    console.log('User exist');
  } else {
    now = new Date();
  }

  return now.toUTCString();
}

/**
 * Stores user's location into repository.
 * @param userId user identifier.
 * @param location user location.
 * @return {any}
 */
function storeHandler(userId, location) {
  return repository.save(userId, location);
}

module.exports = {
  handler: {
    help: helpHandler,
    current: currentTimeHandler,
    store: storeHandler,
  },
};