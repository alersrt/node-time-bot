const loki = require('lokijs');
const db = new loki('database.json');

const records = db.addCollection('records');

/**
 * Saves user and its location to database.
 * @param userId user's identifier.
 * @param location user's location.
 * @return {Promise<any>}
 */
function save(userId, location) {
  return new Promise(resolve => {
    let inserted = records.insert({userId: userId, location: location});
    resolve(inserted);
  });
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
 * @return {Promise<any>}
 */
function findByUserId(userId) {
  return new Promise(resolve => {
    let record = records.findOne({'userId': {'$eq': userId}});
    resolve(record);
  });
}

module.exports.repository = {
  save: save,
  findByUserId: findByUserId,
};