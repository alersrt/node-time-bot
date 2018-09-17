const loki = require('lokijs');
const db = new loki('database.json');

const records = db.addCollection('records');

/**
 * Saves user and its location to database.
 * @param userId user's identifier.
 * @param location user's location.
 * @return {any}
 */
function save(userId, location) {
  return records.insert({id: userId, location: location});
}

/**
 * Return document with information about user location. It looks like:
 * {
 *   id: 'user identifier',
 *   location: {
 *     longitude: 'float number'
 *     latitude: 'float number',
 *   }
 * }
 *
 * @param userId user identifier.
 * @return {*}
 */
function findByUserId(userId) {
  return records.findOne({'id': {'$eq': userId}});
}

module.exports = {
  repository: {
    save: save,
    findByUserId: findByUserId,
  },
};