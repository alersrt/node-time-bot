const {repository} = require('./datasource');
const {timeutil} = require('./timesource');

/**
 * Returns current time for the user.
 * @param userId id of the user which tries to get his current time.
 * @return {Promise<Date | never>}
 */
function currentTimeHandler(userId) {
  return repository.findByUserId(userId)
      .then(value => {
        return !!value ? timeutil.timeinfo(value.location) : null;
      }).then(info => {
        let nowTime = new Date();
        if (!!info) {
          let resultTime = nowTime.getTime() + info.gmtOffset * 1000;
          nowTime = new Date(resultTime);
        }
        return nowTime;
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