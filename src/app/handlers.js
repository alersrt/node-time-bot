/**
 * Return help message.
 * @returns {string}
 */
function helpHandler() {
  return 'It is a just utility bot';
}

/**
 *
 * @param userId id of the user which tries to get his current time.
 * @returns {Array}
 */
function currentHandler(userId) {
  return Date.now();
}

module.exports = {
  handler: {
    help: helpHandler,
    current: currentHandler,
  },
};